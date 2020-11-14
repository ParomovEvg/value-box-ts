import {
  EmptyBox,
  ErrorBox,
  MaybeBox,
  MayFailBox,
  ResultBox,
  ValueBox,
} from '../../../index';

export class TestValue {
  public value = Symbol('test value');
  static get() {
    return new TestValue();
  }
}
export class TestValue1 {
  public value1 = Symbol('test value 1');
  static get() {
    return new TestValue1();
  }
}
export class TestValue2 {
  public value2 = Symbol('test value 2');
  static get() {
    return new TestValue2();
  }
}

export class TestError {
  public error = Symbol('test error');

  static get() {
    return new TestError();
  }
}

export class TestError1 {
  public error1 = Symbol('test error 1');

  static get() {
    return new TestError1();
  }
}

export class TestError2 {
  public error2 = Symbol('test error 2');

  static get() {
    return new TestError2();
  }
}

export const getBoxes = () => ({
  result: ResultBox.of(TestValue.get()),
  error: ErrorBox.of(TestError.get()),
  empty: EmptyBox.get(),
});
export type ValueBoxesKeys = keyof ReturnType<typeof getBoxes>;
export const getValueBoxes = () => {
  return getBoxes() as {
    result: ValueBox<TestError, TestValue>;
    error: ValueBox<TestError, TestValue>;
    empty: ValueBox<TestError, TestValue>;
  };
};
export const getMaybeBoxes = () => {
  return getBoxes() as {
    result: MaybeBox<TestValue>;
    empty: MaybeBox<TestValue>;
  };
};
export const getMayFailBoxes = () => {
  return getBoxes() as {
    result: MayFailBox<TestError, TestValue>;
    error: MayFailBox<TestError, TestValue>;
  };
};
