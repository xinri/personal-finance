import { _delete } from "../../util/xhr";

export function deleteOperation(id: string): Promise<void> {
  return _delete("/operation/" + id);
}
