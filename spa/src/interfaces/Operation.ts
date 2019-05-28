import { Omit } from "../util/omit";

export interface Operation {
  id: string;
  date: Date;
  amount: number;
}

export type SerializedOperation = Omit<Operation, "date"> & {
  date: string;
};
