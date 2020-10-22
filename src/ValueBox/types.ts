import { ValueBox } from './ValueBox';

export type InferBoxError<
  T extends ValueBox<unknown, unknown>
> = T extends ValueBox<infer E, unknown> ? E : never;
export type InferBoxValue<
  T extends ValueBox<unknown, unknown>
> = T extends ValueBox<unknown, infer V> ? V : never;

export type ValueOf<T extends object> = T[keyof T];
