import { MaybeBox, MayFailBox, ResultBox, ValueBox } from '../..';
import {
  InferBoxError,
  InferBoxValue,
  UnknownBox,
  UnknownMaybeBox,
  UnknownMayFailBox,
  ValueOf,
} from '../../ValueBox/types';

type ObjectOfBoxes = Record<string, UnknownBox>;
type ObjectOfMaybeBoxes = Record<string, UnknownMaybeBox>;
type ObjectOfMayFailBoxes = Record<string, UnknownMayFailBox>;

type ErrorFromBoxesObject<T extends ObjectOfBoxes> = ValueOf<
  { [K in keyof T]: InferBoxError<T[K]> }
>;
type ObjectOfBoxesValues<T extends ObjectOfBoxes> = {
  [K in keyof T]: InferBoxValue<T[K]>;
};

export function mergeObjectOfBoxes<T extends ObjectOfMayFailBoxes>(
  values: T
): MayFailBox<ErrorFromBoxesObject<T>, ObjectOfBoxesValues<T>>;
export function mergeObjectOfBoxes<T extends ObjectOfMaybeBoxes>(
  values: T
): MaybeBox<ObjectOfBoxesValues<T>>;
export function mergeObjectOfBoxes<T extends ObjectOfBoxes>(
  values: T
): ValueBox<ErrorFromBoxesObject<T>, ObjectOfBoxesValues<T>>;
export function mergeObjectOfBoxes(values: any) {
  const keys = Object.keys(values);
  const boxes = Object.values(values);
  return boxes
    .reduce(
      (res: ValueBox<unknown, Array<unknown>>, v: any) =>
        v.chain((v: any) => res.map(res => res.concat([v]))),
      ResultBox.of([])
    )
    .map(boxValues => {
      return boxValues.map((boxValue, index) => [keys[index], boxValue]);
    })
    .map(enties => Object.fromEntries(enties)) as any;
}
