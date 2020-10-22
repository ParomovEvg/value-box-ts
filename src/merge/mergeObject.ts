import { merge, ValueBox } from '..';
import { InferBoxError, InferBoxValue, ValueOf } from '../ValueBox/types';

type ObjectOfBoxes = Record<string, ValueBox<unknown, unknown>>;

type ObjectOfBoxesError<T extends ObjectOfBoxes> = ValueOf<
  { [K in keyof T]: InferBoxError<T[K]> }
>;
type ObjectOfBoxesValues<T extends ObjectOfBoxes> = {
  [K in keyof T]: InferBoxValue<T[K]>;
};

export function mergeObject<T extends ObjectOfBoxes>(
  values: T
): ValueBox<ObjectOfBoxesError<T>, ObjectOfBoxesValues<T>> {
  const keys = Object.keys(values);
  const boxes = Object.values(values);

  return merge(boxes)
    .map(boxValues => {
      return boxValues.map((boxValue, index) => [keys[index], boxValue]);
    })
    .map(enties => Object.fromEntries(enties)) as any;
}
