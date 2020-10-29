import { ValueBox } from '../..';
import { MayFailBox } from '../..';
import { MaybeBox } from '../..';

export class ResultBox<ERROR, VALUE>
  implements ValueBox<ERROR, VALUE>, MayFailBox<ERROR, VALUE>, MaybeBox<VALUE> {
  constructor(private value: VALUE) {}

  static of<V>(value: V) {
    return new ResultBox(value);
  }

  getValue() {
    return this.value;
  }

  get isEmpty() {
    return false;
  }

  get isResult() {
    return true;
  }

  get isError() {
    return false;
  }

  map<NEW_VALUE>(fn: (v: VALUE) => NEW_VALUE): ResultBox<ERROR, NEW_VALUE> {
    return ResultBox.of(fn(this.value));
  }

  catch(): ResultBox<never, VALUE> {
    return this;
  }
}
