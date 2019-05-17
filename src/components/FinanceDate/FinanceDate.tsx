import React from "react";

interface Props {
  date: Date;
}

export const FinanceDate: React.StatelessComponent<Props> = ({ date }: Props) => {
  const dateText: string = date.toDateString();
  return <span className="date">{dateText}</span>;
};
