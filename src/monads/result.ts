import { None, Option, OptNone, Some } from "./option";

export const ResultType = {
  Ok: Symbol(":ok"),
  Err: Symbol(":err"),
};

export interface ResultMatch<T, E, U> {
  ok: (val: T) => U;
  err: (val: E) => U;
}

export interface BasicResult<T, E> {
  type: symbol;
  isOk(): boolean;
  isErr(): boolean;
  ok(): Option<T>;
  err(): Option<E>;
  unwrap(): T | never;
  unwrapOr(optb: T): T;
  unwrapOrElse(fn: (err: E) => T): T;
  unwrapErr(): E | never;
  match<U>(fn: ResultMatch<T, E, U>): U;
  map<U>(fn: (val: T) => U): BasicResult<U, E>;
  mapErr<U>(fn: (err: E) => U): BasicResult<T, U>;
  andThen<U>(fn: (val: T) => BasicResult<U, E>): BasicResult<U, E>;
  orElse<U>(
    fn: (err: E) => BasicResult<U, E>,
  ): BasicResult<T, E> | BasicResult<U, E>;
}

export interface ResOk<T, E = never> extends BasicResult<T, E> {
  unwrap(): T;
  unwrapOr(optb: T): T;
  unwrapOrElse(fn: (err: E) => T): T;
  unwrapErr(): never;
  match<U>(fn: ResultMatch<T, never, U>): U;
  map<U>(fn: (val: T) => U): ResOk<U, never>;
  mapErr<U>(fn: (err: E) => U): ResOk<T, never>;
  andThen<U>(fn: (val: T) => BasicResult<U, E>): BasicResult<U, E>;
  orElse<U>(fn: (err: E) => BasicResult<U, E>): BasicResult<T, E>;
}

export interface ResErr<T, E> extends BasicResult<T, E> {
  unwrap(): never;
  unwrapOr(optb: T): T;
  unwrapOrElse(fn: (err: E) => T): T;
  unwrapErr(): E;
  match<U>(fn: ResultMatch<never, E, U>): U;
  map<U>(fn: (val: T) => U): ResErr<never, E>;
  mapErr<U>(fn: (err: E) => U): ResErr<never, U>;
  andThen<U>(fn: (val: T) => BasicResult<U, E>): ResErr<never, E>;
  orElse<U>(fn: (err: E) => BasicResult<U, E>): BasicResult<U, E>;
}

export function BasicOk<T, E = never>(val: T): ResOk<T, E> {
  return {
    type: ResultType.Ok,
    isOk(): boolean {
      return true;
    },
    isErr(): boolean {
      return false;
    },
    ok(): Option<T> {
      return Some(val);
    },
    err(): OptNone<E> {
      return None;
    },
    unwrap(): T {
      return val;
    },
    unwrapOr(_optb: T): T {
      return val;
    },
    unwrapOrElse(_fn: (err: E) => T): T {
      return val;
    },
    unwrapErr(): never {
      throw new ReferenceError("Cannot unwrap Err value of Result.Ok");
    },
    match<U>(matchObject: ResultMatch<T, never, U>): U {
      return matchObject.ok(val);
    },
    map<U>(fn: (val: T) => U): ResOk<U, never> {
      return BasicOk(fn(val));
    },
    mapErr<U>(_fn: (err: E) => U): ResOk<T, never> {
      return BasicOk(val);
    },
    andThen<U>(fn: (val: T) => BasicResult<U, E>): BasicResult<U, E> {
      return fn(val);
    },
    orElse<U>(_fn: (err: E) => BasicResult<U, E>): ResOk<T, E> {
      return BasicOk(val);
    },
  };
}

export function BasicErr<T, E>(err: E): ResErr<T, E> {
  return {
    type: ResultType.Err,
    isOk(): boolean {
      return false;
    },
    isErr(): boolean {
      return true;
    },
    ok(): Option<T> {
      return None;
    },
    err(): Option<E> {
      return Some(err);
    },
    unwrap(): never {
      throw new ReferenceError("Cannot unwrap Ok value of Result.Err");
    },
    unwrapOr(optb: T): T {
      return optb;
    },
    unwrapOrElse(fn: (err: E) => T): T {
      return fn(err);
    },
    unwrapErr(): E {
      return err;
    },
    match<U>(matchObject: ResultMatch<never, E, U>): U {
      return matchObject.err(err);
    },
    map<U>(_fn: (_val: T) => U): ResErr<never, E> {
      return BasicErr(err);
    },
    mapErr<U>(fn: (err: E) => U): ResErr<never, U> {
      return BasicErr(fn(err));
    },
    andThen<U>(_fn: (val: T) => BasicResult<U, E>): ResErr<never, E> {
      return BasicErr(err);
    },
    orElse<U>(fn: (err: E) => BasicResult<U, E>): BasicResult<U, E> {
      return fn(err);
    },
  };
}

export function isOk<T, E>(val: BasicResult<T, E>): val is ResOk<T> {
  return val.isOk();
}

export function isErr<T, E>(val: BasicResult<T, E>): val is ResErr<T, E> {
  return val.isErr();
}
