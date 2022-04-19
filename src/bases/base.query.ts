import { IQuery } from "@nestjs/cqrs";

export abstract class BaseQuery<T> implements IQuery {
  constructor(props: T) {
    Object.keys(props).forEach((key) => {
      Object.defineProperty(this, key, {
        value: props[key as keyof T],
        writable: false,
        enumerable: true,
      });
    });
  }
}
