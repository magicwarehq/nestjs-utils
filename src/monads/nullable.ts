export const NullableType = {
  HasValue: Symbol(":hasValue"),
  HasNoValue: Symbol(":hasNoValue"),
};

export interface NullableMatch<T, U> {
  hasValue: (val: T) => U;
  hasNoValue: () => U;
}

export interface Nullable<T> {
  type: symbol;
  hasValue(): boolean;
  value(): T | never;
}

export interface Value<T> extends Nullable<T> {
  value(): T;
}

export interface HasNoValue extends Nullable<never> {
  value(): never;
}

export function Value<T>(val: T): Value<T> {
  return {
    type: NullableType.HasValue,

    hasValue(): boolean {
      return true;
    },

    value(): T {
      return val;
    },
  };
}

export function Null(): HasNoValue {
  return {
    type: NullableType.HasNoValue,
    hasValue(): boolean {
      return false;
    },
    value(): never {
      throw new ReferenceError("Cannot get value of Nullable without value");
    },
  };
}

export function hasValue<T>(val: Nullable<T>): val is Value<T> {
  return val.hasValue();
}
