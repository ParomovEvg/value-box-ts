import { ValueBox } from './ValueBox';
import { ResultBox } from './ResultBox';

class EmptyBoxError extends Error {
  name = 'EmptyBoxError';
  constructor() {
    super('Called then on empty box');
  }
}

export class EmptyBox<ERROR, VALUE> implements ValueBox<ERROR, VALUE> {
  static of<E = unknown, V = unknown>() {
    return new EmptyBox<E, V>();
  }

  caseOf<RESULT, ERROR_RESULT, DEFAULT_RESULT>(obj: {
    result: (fn: VALUE) => RESULT;
    error: (fn: ERROR) => ERROR_RESULT;
    empty: () => DEFAULT_RESULT;
  }): RESULT | ERROR_RESULT | DEFAULT_RESULT {
    return obj.empty();
  }

  catch<NEW_VALUE>(
    _: (e: ERROR) => NEW_VALUE
  ): ValueBox<ERROR, NEW_VALUE | VALUE> {
    return EmptyBox.of<ERROR, VALUE>();
  }

  default<NEW_VALUE>(fn: () => NEW_VALUE): ValueBox<ERROR, NEW_VALUE | VALUE> {
    return ResultBox.of(fn());
  }

  isEmpty(): boolean {
    return true;
  }

  isError(): boolean {
    return false;
  }

  isResult(): boolean {
    return false;
  }

  chain<NEW_ERROR, NEW_VALUE>(
    _: (v: VALUE) => ValueBox<NEW_ERROR, NEW_VALUE>
  ): ValueBox<NEW_ERROR | ERROR, NEW_VALUE> {
    return EmptyBox.of<NEW_ERROR | ERROR, NEW_VALUE>();
  }

  map<NEW_VALUE>(_: (v: VALUE) => NEW_VALUE): ValueBox<ERROR, NEW_VALUE> {
    return EmptyBox.of<ERROR, NEW_VALUE>();
  }

  then<TResult1 = VALUE, TResult2 = never>(
    fulfilled?:
      | ((value: VALUE) => PromiseLike<TResult1> | TResult1)
      | undefined
      | null,
    rejected?:
      | ((reason: any) => PromiseLike<TResult2> | TResult2)
      | undefined
      | null
  ): PromiseLike<TResult1 | TResult2> {
    return Promise.reject(new EmptyBoxError()).then(fulfilled, rejected);
  }
}
