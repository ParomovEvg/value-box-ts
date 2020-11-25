import {
  InferBoxError,
  InferBoxValue,
  UnknownBox,
  UnknownMaybeBox,
  UnknownMayFailBox,
} from '../../ValueBox/types';
import {
  isEmptyBox,
  isErrorBox,
  isResultBox,
  MaybeBox,
  MayFailBox,
  ResultBox,
  ValueBox,
} from '../..';

export function mergeArrayOfBoxesStrict<T extends UnknownMaybeBox>(
  boxes: T[]
): MaybeBox<InferBoxValue<T>[]>;
export function mergeArrayOfBoxesStrict<T extends UnknownMayFailBox>(
  boxes: T[]
): MayFailBox<InferBoxError<T>, InferBoxValue<T>[]>;
export function mergeArrayOfBoxesStrict<T extends UnknownBox>(
  boxes: T[]
): ValueBox<InferBoxError<T>, InferBoxValue<T>[]>;
export function mergeArrayOfBoxesStrict(boxes: ValueBox<any, any>[]): any {
  const result: any[] = [];
  for (const box of boxes) {
    if (isErrorBox(box)) {
      return box;
    }
    if (isEmptyBox(box)) {
      return box;
    }
    if (isResultBox(box)) {
      result.push(box.getValue());
    }
  }
  return ResultBox.of(result);
}
