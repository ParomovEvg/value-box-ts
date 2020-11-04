import {
  InferBoxError,
  InferBoxValue,
  UnknownBox,
  UnknownMaybeBox,
  UnknownMayFailBox,
} from '../../ValueBox/types';
import {
  isErrorBox,
  isResultBox,
  MayFailBox,
  ResultBox,
  ValueBox,
} from '../..';

export function mergeArrayOfBoxes<T extends UnknownMaybeBox>(
    boxes: T[]
): ResultBox<InferBoxValue<T>[]>;
export function mergeArrayOfBoxes<T extends UnknownMayFailBox>(
  boxes: T[]
): MayFailBox<InferBoxError<T>, InferBoxValue<T>[]>;
export function mergeArrayOfBoxes<T extends UnknownBox>(
  boxes: T[]
): ValueBox<InferBoxError<T>, InferBoxValue<T>[]>;
export function mergeArrayOfBoxes(boxes: ValueBox<any, any>[]) {
  const result: any[] = [];
  for (const box of boxes) {
    if (isErrorBox(box)) {
      return box;
    }
    if (isResultBox(box)) {
      result.push(box.getValue());
    }
  }
  return ResultBox.of(result);
}
