export function mockObject<T>(wrappedObject: Partial<T>): T {
  return new Proxy(wrappedObject, {
    //@ts-ignore
    get: (target: Partial<T>, property: string) => (property in target ? target[property] : mockObject({})),
    set: () => {
      throw new Error(`A mocked object shall not be mutated`);
    }
  }) as T;
}
