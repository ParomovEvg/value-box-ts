export class TestValue {
  public value = Symbol('test value');
  static of() {
    return new TestValue();
  }
}
export class TestValue1 {
  public value1 = Symbol('test value 1');
  static of() {
    return new TestValue1();
  }
}
export class TestValue2 {
  public value2 = Symbol('test value 2');
  static of() {
    return new TestValue2();
  }
}

export class TestError {
  public error = Symbol('test error');

  static of() {
    return new TestError();
  }
}

export class TestError1 {
  public error1 = Symbol('test error 1');

  static of() {
    return new TestError1();
  }
}

export class TestError2 {
  public error2 = Symbol('test error 2');

  static of() {
    return new TestError2();
  }
}
