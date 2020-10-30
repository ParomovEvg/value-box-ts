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
  get isEmpty() {
    return false;
  }

  get isResult() {
    return false;
  }
  get isError() {
    return true;
  }

  map(): ErrorBox<ERROR> {
    return this;
  }

  catch<NEW_VALUE>(fn: (e: ERROR) => NEW_VALUE): ResultBox<NEW_VALUE> {
    return ResultBox.of(fn(this.error));
  }

  default(): ErrorBox<ERROR> {
    return this;
  }
}
