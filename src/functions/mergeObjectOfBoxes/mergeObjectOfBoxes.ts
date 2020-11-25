import {
  ErrorFromBoxesObject,
  MaybeBox,
  MayFailBox,
  ObjectOfBoxes,
  ObjectOfBoxesValues,
  ObjectOfMaybeBoxes,
  ObjectOfMayFailBoxes,
  ResultBox,
  ValueBox,
} from '../..';

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
