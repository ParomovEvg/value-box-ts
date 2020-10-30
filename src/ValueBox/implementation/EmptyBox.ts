import { ResultBox, ValueBox } from '../..';
import { MaybeBox } from '../..';

export class EmptyBox implements ValueBox<never, never>, MaybeBox<never> {
  private static instance = new EmptyBox();
  static get() {
    return this.instance;
  }

  get isEmpty() {
    return true;
  }

  get isResult() {
    return false;
  }
  get isError() {
    return false;
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
}
