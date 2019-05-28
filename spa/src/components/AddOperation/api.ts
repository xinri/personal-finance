import { _post } from "../../util/xhr";

export function addOperation(): Promise<void> {
  return _post("/operation");
}
