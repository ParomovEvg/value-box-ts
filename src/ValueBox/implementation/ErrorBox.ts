import { ResultBox, ValueBox } from '../..';
import { MayFailBox } from '../..';

export class ErrorBox<ERROR, VALUE>
  implements ValueBox<ERROR, VALUE>, MayFailBox<ERROR, VALUE> {
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

  map<NEW_VALUE>(): ErrorBox<ERROR, NEW_VALUE> {
    return this;
  }

  catch<NEW_VALUE>(fn: (e: ERROR) => NEW_VALUE): ResultBox<never, NEW_VALUE> {
    return ResultBox.of(fn(this.error));
  }
}
