import {
  TestError,
  TestValue,
} from '../ValueBox/implementation/__test__/TestValue';
import { EmptyBox, ErrorBox, ResultBox, ValueBox } from '..';

describe('value box', () => {
  const defaultValue = Symbol('default value');
  const resultsValue = Symbol('result value');
  const errorValue = Symbol('error value');

  const callSequence = (valueBox: ValueBox<TestError, TestValue>) =>
    valueBox
      .map(() => resultsValue)
      .catch(() => errorValue)
      .default(defaultValue)
      .getValue();

  test('result sequence', () => {
    const result = callSequence(ResultBox.of(TestValue.get()));
    expect(result).toBe(resultsValue);
  });

  test('error sequence', () => {
    const result = callSequence(ErrorBox.of(TestError.get()));
    expect(result).toBe(errorValue);
  });

  test('default sequence', () => {
    const result = callSequence(EmptyBox.of());
    expect(result).toBe(defaultValue);
  });
});
