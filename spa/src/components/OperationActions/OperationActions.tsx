import React from "react";
import "./OperationActions.scss";

export interface Props {
  id: string;
  onDelete(id: string): void;
}

export const OperationActions: React.StatelessComponent<Props> = ({ id, onDelete }: Props) => {
  const onDeleteClick = () => onDelete(id);
  return (
    <div className="actions">
      <button
        className="delete mdl-button mdl-js-button mdl-button--icon"
        onClick={onDeleteClick}
        data-e2e="account-operation-delete"
      >
        <i className="material-icons">delete</i>
      </button>
    </div>
  );
};
