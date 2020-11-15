import { ValueBox } from '../..';
import { MayFailBox } from '../..';
import { MaybeBox } from '../..';
import { EmptyBox } from './EmptyBox';

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

  smartMap<NEW_VALUE>(
    fn: (v: VALUE) => NEW_VALUE | undefined | null
  ): EmptyBox | ResultBox<NEW_VALUE> {
    const result = fn(this.value);

    if (result === undefined || result === null) {
      return EmptyBox.get();
    }
    return ResultBox.of(result);
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

  caseOf<RESULT>(obj: { result: (fn: VALUE) => RESULT }): RESULT {
    return obj.result(this.value);
  }

  onEmpty(): ResultBox<VALUE> {
    return this;
  }

  onError(): ResultBox<VALUE> {
    return this;
  }

  onResult(fn: (v: VALUE) => void): ResultBox<VALUE> {
    fn(this.value);
    return this;
  }
}
