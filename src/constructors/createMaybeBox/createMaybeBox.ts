import { EmptyBox, MaybeBox, ResultBox } from '../..';

export const createMaybeBox = <T>(v: T | undefined | null): MaybeBox<T> => {
  if (v === null || v === undefined) {
    return EmptyBox.get();
  } else {
    return ResultBox.of(v);
  }
};
