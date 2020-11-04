import { ValueBox } from '../..';
import { MayFailBox } from '../..';
import { MaybeBox } from '../..';

export class ResultBox<VALUE>
  implements ValueBox<never, VALUE>, MayFailBox<never, VALUE>, MaybeBox<VALUE> {
  constructor(private value: VALUE) {}

  static of<V>(value: V) {
    return new ResultBox(value);
  }

  getValue() {
    return this.value;
  }

  map<NEW_VALUE>(fn: (v: VALUE) => NEW_VALUE): ResultBox<NEW_VALUE> {
    return ResultBox.of(fn(this.value));
  }

  catch(): ResultBox<VALUE> {
    return this;
  }

  default(): ResultBox<VALUE> {
    return this;
  }

  chain(fn: (v: VALUE) => any) {
    return fn(this.value);
  }
}
