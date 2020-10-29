import { ValueBox } from '../..';
import { MaybeBox } from '../..';

export class EmptyBox<ERROR, VALUE>
  implements ValueBox<ERROR, VALUE>, MaybeBox<VALUE> {
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

  map<NEW_VALUE>(): EmptyBox<ERROR, NEW_VALUE> {
    return EmptyBox.get();
  }

  catch<NEW_VALUE>(): EmptyBox<ERROR, NEW_VALUE | VALUE> {
    return EmptyBox.get();
  }
}
