import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { AddOperationComponent } from "./AddOperation";
// import { AddOperation } from "./AddOperation.uncontrolled";
import { Operation } from "../../business/account/operation/model";

describe("<AddOperation />", () => {
  it("should not call addOperation when the user inputs 0 and clicks the add button", () => {
    // GIVEN
    const addOperation = jest.fn();
    const element = <AddOperationComponent addOperation={addOperation} />;
    const wrapper: ReactWrapper = mount(element);
    const input: ReactWrapper = wrapper.find(".input-amount");
    const button: ReactWrapper = wrapper.find(".add-amount");

    // WHEN
    input.simulate("change", { target: { value: "0" } });
    button.simulate("click");

    // THEN
    expect(addOperation).not.toHaveBeenCalled();
  });

  it("should not call addOperation when the user resets the input and clicks the add button", () => {
    // GIVEN
    const addOperation = jest.fn();
    const element = <AddOperationComponent addOperation={addOperation} />;
    const wrapper: ReactWrapper = mount(element);
    const input: ReactWrapper = wrapper.find(".input-amount");
    const button: ReactWrapper = wrapper.find(".add-amount");
    input.simulate("change", { target: { value: "1" } });

    // WHEN
    input.simulate("change", { target: { value: "" } });
    button.simulate("click");

    // THEN
    expect(addOperation).not.toHaveBeenCalled();
  });

  it("should call addOperation when the user inputs a valid value and clicks the add button, then clear input value", () => {
    // GIVEN
    const result: any = {};
    const addOperation = jest.fn().mockImplementation(function setOperation({ amount }: Operation): void {
      result["amount"] = amount;
    });
    const element = <AddOperationComponent addOperation={addOperation} />;
    const wrapper: ReactWrapper = mount(element);
    const input: ReactWrapper = wrapper.find(".input-amount");
    const button: ReactWrapper = wrapper.find(".add-amount");

    // WHEN
    input.simulate("change", { target: { value: "100" } });
    button.simulate("click");

    // THEN
    expect(addOperation).toHaveBeenCalledTimes(1);
    expect(result.amount).toEqual(100);
    expect(input.getDOMNode().getAttribute("value")).toEqual("");
  });
});
