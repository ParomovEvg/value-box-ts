import { ErrorBox } from '../ErrorBox';
import { ResultBox, ValueBox } from '../../..';
import { MayFailBox } from '../../..';
import { TestError, TestValue, TestValue1 } from './TestValue';

describe('ErrorBox', () => {
  const innerError = TestError.of();
  const valueBox: ValueBox<TestError, TestValue> = ErrorBox.of(innerError);
  const mayFailBox: MayFailBox<TestError, TestValue> = ErrorBox.of(innerError);
  const errorBox = ErrorBox.of(innerError);

  describe('of static method', () => {
    it('should return ErrorBox instance', () => {
      expect(valueBox).toBeInstanceOf(ErrorBox);
      expect(mayFailBox).toBeInstanceOf(ErrorBox);
    });
  });

  describe('getError method', () => {
    it('should return inner error', () => {
      const result = errorBox.getError();
      expect(result).toBe(innerError);
    });
  });
  describe('isEmpty getter', () => {
    it('should return false', () => {
      expect(errorBox.isEmpty).toEqual(false);
    });
  });
  describe('isError getter', () => {
    it('should return true', () => {
      expect(errorBox.isError).toEqual(true);
    });
  });
  describe('isResult getter', () => {
    it('should return false', () => {
      expect(errorBox.isResult).toEqual(false);
    });
  });

  describe('map method', () => {
    const callback = jest.fn() as (v: TestValue) => TestValue1;
    beforeEach(() => jest.clearAllMocks());

    it('should be in ValueBox and MayFailBox', () => {
      valueBox.map(callback);
      mayFailBox.map(callback);
    });
    it('should return ErrorBox', () => {
      const res = valueBox.map(callback);
      expect(res).toBeInstanceOf(ErrorBox);
    });
    it('should not call callback', () => {
      valueBox.map(callback);
      expect(callback).not.toBeCalled();
    });

  });

  describe('catch method', () => {
    const callbackResultValue = TestValue.of();
    const callback = jest.fn((_: TestError) => callbackResultValue);
    beforeEach(() => jest.clearAllMocks());

    it('should be in ValueBox and MayFailBox', () => {
      valueBox.catch(callback);
      mayFailBox.catch(callback);
    });

    it('should return ResultBox', () => {
      const result = valueBox.catch(callback);
      expect(result).toBeInstanceOf(ResultBox);
    });

    it('should call callback with inner error', () => {
      valueBox.catch(callback);
      expect(callback).toBeCalledWith(innerError);
      expect(callback).toBeCalledTimes(1);
    });

    it('should return ResultBox with callback value', () => {
      const res = mayFailBox.catch(callback);
      expect(res.getValue()).toBe(callbackResultValue);
    });
  });
});
