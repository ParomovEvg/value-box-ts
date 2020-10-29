import { ResultBox } from '../ResultBox';
import { MaybeBox, MayFailBox, ValueBox } from '../../..';
import { TestError, TestValue, TestValue1 } from './TestValue';

describe('ResultBox', () => {
  const innerValue = TestValue.of();
  const valueBox: ValueBox<TestError, TestValue> = ResultBox.of(innerValue);
  const mayFailBox: MayFailBox<TestError, TestValue> = ResultBox.of(innerValue);
  const maybeBox: MaybeBox<TestValue> = ResultBox.of(innerValue);
  const resultBox = ResultBox.of(innerValue);

  describe('of static method', () => {
    it('should return ResultBox instance', () => {
      expect(valueBox).toBeInstanceOf(ResultBox);
      expect(maybeBox).toBeInstanceOf(ResultBox);
      expect(mayFailBox).toBeInstanceOf(ResultBox);
    });
  });

  describe('getValue method', () => {
    it('should return inner value', () => {
      const result = resultBox.getValue();
      expect(result).toBe(innerValue);
    });
  });

  describe('isEmpty getter', () => {
    it('should return false', () => {
      expect(resultBox.isEmpty).toEqual(false);
    });
  });
  describe('isError getter', () => {
    it('should return false', () => {
      expect(resultBox.isError).toEqual(false);
    });
  });
  describe('isResult getter', () => {
    it('should return false', () => {
      expect(resultBox.isResult).toEqual(true);
    });
  });

  describe('map method', () => {
    const callbackResult = TestValue1.of();
    const callback = jest.fn((_: TestValue) => callbackResult);
    beforeEach(() => jest.clearAllMocks());

    it('should be in ValueBox, MayFailBox and MaybeBox', () => {
      valueBox.map(callback);
      maybeBox.map(callback);
      mayFailBox.map(callback);
    });

    it('should return ResultBox ', () => {
      const result = valueBox.map(callback);
      expect(result).toBeInstanceOf(ResultBox);
    });

    it('should be called with innerValue', () => {
      valueBox.map(callback);
      expect(callback).toBeCalledWith(innerValue);
    });

    it('should be return ResultBox with callbackResult', () => {
      const result = resultBox.map(callback);
      expect(result.getValue()).toBe(callbackResult);
    });
  });

  describe('catch method', () => {
    const callback = jest.fn() as (v: TestError) => TestValue;
    it('should be in ValueBox and MayFailBox', () => {
      valueBox.catch(callback);
      mayFailBox.catch(callback);
    });

    it('should return this', () => {
      const result = valueBox.catch(callback);
      expect(result).toBe(valueBox);
    });

    it('should not call callback', () => {
      valueBox.catch(callback);
      expect(callback).not.toBeCalled();
    });
  });
});
