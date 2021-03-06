import { ResultBox, ValueBox } from '../..';
import { MaybeBox } from '../..';

export class EmptyBox implements ValueBox<never, never>, MaybeBox<never> {
  private static instance = new EmptyBox();

  static get() {
    return EmptyBox.instance;
  }

  map(): EmptyBox {
    return EmptyBox.get();
  }

  catch(): EmptyBox {
    return EmptyBox.get();
  }

  default<NEW_VALUE>(defaultValue: NEW_VALUE): ResultBox<NEW_VALUE> {
    return ResultBox.of(defaultValue);
  }

  chain() {
    return this;
  }

  smartMap(): EmptyBox {
    return this;
  }

  caseOf<DEFAULT_RESULT>(obj: { empty: () => DEFAULT_RESULT }): DEFAULT_RESULT {
    return obj.empty();
  }

  onEmpty(fn: () => void): EmptyBox {
    fn();
    return this;
  }

  onError(): EmptyBox {
    return this;
  }

  onResult(): EmptyBox {
    return this;
  }

  unwrap(){
    return undefined
  }
}
