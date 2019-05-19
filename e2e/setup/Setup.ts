import { APPLICATION_URL } from "./environment";

export class Setup {
  public getAccountUrl(): string {
    return APPLICATION_URL + "/";
  }
}
