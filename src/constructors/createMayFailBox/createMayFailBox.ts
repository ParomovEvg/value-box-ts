import { ErrorBox, MayFailBox, ResultBox } from '../..';

export type ThrowError<T> = (e: T) => never;
export const createMayFailBox = <ERROR, VALUE>(
  constructor: (throwError: ThrowError<ERROR>) => VALUE
): MayFailBox<ERROR, VALUE> => {
  const throwError = (e: ERROR): never => {
    throw e;
  };
  try {
    return ResultBox.of(constructor(throwError));
  } catch (e) {
    return ErrorBox.of(e as ERROR);
  }
};
