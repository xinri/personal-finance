import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { AddOperation } from "./AddOperation";
// import { AddOperation } from "./AddOperation.uncontrolled";
import { Operation } from "../../interfaces/Operation";

describe("<AddOperation />", () => {
  it("should not call onNewOperation when the user inputs 0 and clicks the add button", () => {
    // GIVEN
    const onNewOperation = jest.fn();
    const element = <AddOperation onNewOperation={onNewOperation} />;
    const wrapper: ReactWrapper = mount(element);
    const input: ReactWrapper = wrapper.find(".input-amount");
    const button: ReactWrapper = wrapper.find(".add-amount");

    // WHEN
    input.simulate("change", { target: { value: "0" } });
    button.simulate("click");

    // THEN
    expect(onNewOperation).not.toHaveBeenCalled();
  });

  it("should not call onNewOperation when the user resets the input and clicks the add button", () => {
    // GIVEN
    const onNewOperation = jest.fn();
    const element = <AddOperation onNewOperation={onNewOperation} />;
    const wrapper: ReactWrapper = mount(element);
    const input: ReactWrapper = wrapper.find(".input-amount");
    const button: ReactWrapper = wrapper.find(".add-amount");
    input.simulate("change", { target: { value: "1" } });

    // WHEN
    input.simulate("change", { target: { value: "" } });
    button.simulate("click");

    // THEN
    expect(onNewOperation).not.toHaveBeenCalled();
  });

  it("should call onNewOperation when the user inputs a valid value and clicks the add button", () => {
    // GIVEN
    const result: any = {};
    const onNewOperation = jest.fn().mockImplementation(function setOperation({ amount }: Operation): void {
      result["amount"] = amount;
    });
    const element = <AddOperation onNewOperation={onNewOperation} />;
    const wrapper: ReactWrapper = mount(element);
    const input: ReactWrapper = wrapper.find(".input-amount");
    const button: ReactWrapper = wrapper.find(".add-amount");

    // WHEN
    input.simulate("change", { target: { value: "100" } });
    button.simulate("click");

    // THEN
    expect(onNewOperation).toHaveBeenCalledTimes(1);
    expect(result.amount).toEqual(100);
  });
});
