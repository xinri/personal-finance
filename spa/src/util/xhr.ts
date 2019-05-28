import fetch, { Response } from "node-fetch";

const URL_ROOT: string | undefined = process.env.REACT_APP_URL_ROOT;

if (URL_ROOT === undefined) {
  console.warn("Warning: no environment variable is set for URL_ROOT");
}

export function _post(path: string): Promise<void> {
  return fetch(URL_ROOT + path, { method: "POST" }).then();
}

export function _get<T>(path: string): Promise<T> {
  return fetch(URL_ROOT + path, { method: "GET" }).then((result: Response) => result.json());
}

export function _delete(path: string): Promise<void> {
  return fetch(URL_ROOT + path, { method: "DELETE" }).then();
}
