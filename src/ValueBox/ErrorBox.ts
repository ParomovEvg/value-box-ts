import { ValueBox } from './ValueBox';
import { ResultBox } from './ResultBox';

export class ErrorBox<ERROR, VALUE> implements ValueBox<ERROR, VALUE> {
  constructor(private error: ERROR) {}

  static of<E, V>(error: E) {
    return new ErrorBox<E, V>(error);
  }

  caseOf<RESULT, ERROR_RESULT, DEFAULT_RESULT>(obj: {
    result: (fn: VALUE) => RESULT;
    error: (fn: ERROR) => ERROR_RESULT;
    empty: () => DEFAULT_RESULT;
  }): RESULT | ERROR_RESULT | DEFAULT_RESULT {
    return obj.error(this.error);
  }

  catch<NEW_VALUE>(
    fn: (e: ERROR) => NEW_VALUE
  ): ValueBox<ERROR, NEW_VALUE | VALUE> {
    return ResultBox.of(fn(this.error));
  }

  default<NEW_VALUE>(_: () => NEW_VALUE): ValueBox<ERROR, NEW_VALUE | VALUE> {
    return this;
  }

  isEmpty(): boolean {
    return false;
  }

  isError(): boolean {
    return true;
  }

  isResult(): boolean {
    return false;
  }

  chain<NEW_ERROR, NEW_VALUE>(
    _: (v: VALUE) => ValueBox<NEW_ERROR, NEW_VALUE>
  ): ValueBox<NEW_ERROR | ERROR, NEW_VALUE> {
    return ErrorBox.of<ERROR, NEW_VALUE>(this.error);
  }

  map<NEW_VALUE>(_: (v: VALUE) => NEW_VALUE): ValueBox<ERROR, NEW_VALUE> {
    return ErrorBox.of<ERROR, NEW_VALUE>(this.error);
  }
}
