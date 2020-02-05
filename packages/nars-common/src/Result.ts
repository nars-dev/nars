export interface Success<T> {
  type: "Success";
  value: T;
}

export interface Error {
  type: "Error";
}

export type Result<T> = Success<T> | Error;

export function success<T>(value: T): Result<T> {
  return {
    type: "Success",
    value,
  };
}

export const error: Result<any> = { type: "Error" };

export function isSuccess<T>(x: Result<T>): x is Success<T> {
  return x.type === "Success";
}

export function isError<T>(x: Result<T>): x is Error {
  return !isSuccess(x);
}
