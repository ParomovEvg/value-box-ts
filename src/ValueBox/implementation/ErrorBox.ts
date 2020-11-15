import { ResultBox, ValueBox } from '../..';
import { MayFailBox } from '../..';

export class ErrorBox<ERROR>
  implements ValueBox<ERROR, never>, MayFailBox<ERROR, never> {
  constructor(private error: ERROR) {}
  static of<E>(error: E) {
    return new ErrorBox(error);
  }

  getError() {
    return this.error;
  }

  map(): ErrorBox<ERROR> {
    return this;
  }

  smartMap(): ErrorBox<ERROR> {
    return this;
  }

  catch<NEW_VALUE>(fn: (e: ERROR) => NEW_VALUE): ResultBox<NEW_VALUE> {
    return ResultBox.of(fn(this.error));
  }

  default(): ErrorBox<ERROR> {
    return this;
  }
  chain() {
    return this;
  }

  caseOf<ERROR_RESULT>(obj: {
    error: (fn: ERROR) => ERROR_RESULT;
  }): ERROR_RESULT {
    return obj.error(this.error);
  }
}
