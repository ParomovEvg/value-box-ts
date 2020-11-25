import { ValueBox } from './interfaces/ValueBox';
import { MayFailBox } from './interfaces/MayFailBox';
import { MaybeBox } from './interfaces/MaybeBox';

export type UnknownBox =
  | ValueBox<unknown, unknown>
  | MayFailBox<unknown, unknown>
  | MaybeBox<unknown>;

export type UnknownMayFailBox = MayFailBox<unknown, unknown>;

export type UnknownMaybeBox = MaybeBox<unknown>;

export type InferBoxError<T extends UnknownBox> = T extends ValueBox<
  infer E1,
  unknown
>
  ? E1
  : T extends MayFailBox<infer E2, any>
  ? E2
  : never;

export type InferBoxValue<T extends UnknownBox> = T extends ValueBox<
  unknown,
  infer V1
>
  ? V1
  : T extends MayFailBox<unknown, infer V2>
  ? V2
  : T extends MaybeBox<infer V3>
  ? V3
  : never;
export type ValueOf<T extends object> = T[keyof T];
export type ArrayItem<T extends Array<unknown>> = T extends Array<infer F>
  ? F
  : never;
export type ObjectOfBoxes = Record<string, UnknownBox>;
export type ObjectOfMaybeBoxes = Record<string, UnknownMaybeBox>;
export type ObjectOfMayFailBoxes = Record<string, UnknownMayFailBox>;
export type ErrorFromBoxesObject<T extends ObjectOfBoxes> = ValueOf<{ [K in keyof T]: InferBoxError<T[K]> }>;
export type ObjectOfBoxesValues<T extends ObjectOfBoxes> = {
  [K in keyof T]: InferBoxValue<T[K]>;
};