import { ResultBox, ValueBox } from '../..';
import { MaybeBox } from '../..';

export class EmptyBox implements ValueBox<never, never>, MaybeBox<never> {
  private static instance = new EmptyBox();

  static of() {
    return EmptyBox.instance;
  }

  map(): EmptyBox {
    return EmptyBox.of();
  }

  catch(): EmptyBox {
    return EmptyBox.of();
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
}
