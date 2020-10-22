import { ValueBox } from './ValueBox';

export class ResultBox<ERROR, VALUE> implements ValueBox<ERROR, VALUE> {
  constructor(private value: VALUE) {}

  static of<E = unknown, V = unknown>(value: V) {
    return new ResultBox<E, V>(value);
  }

  caseOf<RESULT, ERROR_RESULT, DEFAULT_RESULT>(obj: {
    result: (fn: VALUE) => RESULT;
    error: (fn: ERROR) => ERROR_RESULT;
    empty: () => DEFAULT_RESULT;
  }): RESULT | ERROR_RESULT | DEFAULT_RESULT {
    return obj.result(this.value);
  }

  catch<NEW_VALUE>(
    _: (e: ERROR) => NEW_VALUE
  ): ValueBox<ERROR, NEW_VALUE | VALUE> {
    return this;
  }

  default<NEW_VALUE>(_: () => NEW_VALUE): ValueBox<ERROR, NEW_VALUE | VALUE> {
    return this;
  }

  isEmpty(): boolean {
    return false;
  }

  isError(): boolean {
    return false;
  }

  isResult(): boolean {
    return true;
  }

  chain<NEW_ERROR, NEW_VALUE>(
    fn: (v: VALUE) => ValueBox<NEW_ERROR, NEW_VALUE>
  ): ValueBox<NEW_ERROR | ERROR, NEW_VALUE> {
    return fn(this.value);
  }

  map<NEW_VALUE>(fn: (v: VALUE) => NEW_VALUE): ValueBox<ERROR, NEW_VALUE> {
    return ResultBox.of(fn(this.value));
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
  ): Promise<TResult1 | TResult2> {
    return Promise.resolve(this.value).then(fulfilled, rejected);
  }
}
