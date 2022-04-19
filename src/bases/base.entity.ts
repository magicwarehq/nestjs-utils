import { AggregateRoot } from "@nestjs/cqrs";

import { EntityId } from "../classes";

const isEntity = (v: any): v is BaseEntity<any> => {
  return v instanceof BaseEntity;
};

export interface IBaseEntity {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export abstract class BaseEntity<T extends IBaseEntity> extends AggregateRoot {
  protected readonly _id: EntityId;
  protected _props: { createdAt: Date } & T;

  constructor(props: T, id: EntityId | null) {
    super();
    this._id = id ? id : new EntityId();

    Object.defineProperty(this, "_props", {
      value: props,
      writable: true,
      enumerable: true,
    });

    if (!props.createdAt) {
      this._props.createdAt = new Date();
    }
  }

  get id() {
    return this._id;
  }

  get props(): T {
    const obj: any = {};
    Object.keys(this._props).forEach((key: unknown) => {
      if (Array.isArray(this._props[key as keyof T])) {
        obj[key as keyof T] = [
          ...(this._props[key as keyof T] as unknown as any[]),
        ] as unknown;
      } else {
        obj[key as keyof T] = this._props[key as keyof T];
      }
    });
    return obj as T;
  }

  public equals(object?: BaseEntity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object.id);
  }
}
