import { ICommand } from "@nestjs/cqrs";

export abstract class BaseCommand<T> implements ICommand {
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
