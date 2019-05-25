import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { OperationActions } from "./OperationActions";

describe("<OperationActions />", () => {
  it("should call onDelete when the user clicks on the delete icon", () => {
    // GIVEN
    const id = "0";
    const onDelete = jest.fn();
    const element = <OperationActions id={id} onDelete={onDelete} />;
    const wrapper: ReactWrapper = mount(element);
    const deleteButton: ReactWrapper = wrapper.find(".delete");

    // WHEN
    deleteButton.simulate("click");

    // THEN
    expect(onDelete).toHaveBeenCalledWith("0");
  });
});
