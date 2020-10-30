import { ErrorBox } from '../ErrorBox';
import { ResultBox } from '../../..';
import { TestError, TestValue, TestValue1 } from './TestValue';
import { IsEmptyUseCase } from '../../useCases/IsEmptyUseCase';
import { IsErrorUseCase } from '../../useCases/IsErrorUseCase';
import { IsResultUseCase } from '../../useCases/IsResultUseCase';
import { MapMayFailBoxUseCase } from '../../useCases/MapUseCase';
import {
  CatchMayFailBoxUseCase,
  CatchValueBoxUseCase,
} from '../../useCases/CatchUseCase';

describe('ErrorBox', () => {
  const innerError = TestError.get();
  const errorBox = ErrorBox.of(innerError);

  describe('get static method', () => {
    it('should return ErrorBox instance', () => {
      expect(errorBox).toBeInstanceOf(ErrorBox);
    });
  });

  describe('getError method', () => {
    it('should return inner error', () => {
      const result = errorBox.getError();
      expect(result).toBe(innerError);
    });
  });
  describe('isEmpty use case', () => {
    const isEmptyUseCase: IsEmptyUseCase = errorBox;
    it('should return false', () => {
      expect(isEmptyUseCase.isEmpty).toEqual(false);
    });
  });
  describe('isError use case', () => {
    const isErrorUseCase: IsErrorUseCase = errorBox;
    it('should return true', () => {
      expect(isErrorUseCase.isError).toEqual(true);
    });
  });
  describe('isResult use case', () => {
    const isResultUseCase: IsResultUseCase = errorBox;
    it('should return false', () => {
      expect(isResultUseCase.isResult).toEqual(false);
    });
  });

  describe('map use case', () => {
    const mapMayFailBoxUseCase: MapMayFailBoxUseCase<
      TestError,
      TestValue
    > = errorBox;
    const mapValueBoxUseCase: MapMayFailBoxUseCase<
      TestError,
      TestValue
    > = errorBox;
    const callback = jest.fn() as (v: TestValue) => TestValue1;
    beforeEach(() => jest.clearAllMocks());

    it('should return ErrorBox', () => {
      const res = mapValueBoxUseCase.map(callback);
      expect(res).toBeInstanceOf(ErrorBox);
    });
    it('should not call callback', () => {
      mapMayFailBoxUseCase.map(callback);
      expect(callback).not.toBeCalled();
    });
  });

  describe('catch method', () => {
    const callbackResultValue = TestValue.get();
    const callback = jest.fn((_: TestError) => callbackResultValue);
    beforeEach(() => jest.clearAllMocks());

    const catchValueBoxUseCase: CatchValueBoxUseCase<
      TestError,
      TestValue
    > = errorBox;
    const catchMayFailUseCase: CatchMayFailBoxUseCase<
      TestError,
      TestValue
    > = errorBox;

    it('should return ResultBox', () => {
      const result = catchValueBoxUseCase.catch(callback);
      expect(result).toBeInstanceOf(ResultBox);
    });

    it('should call callback with inner error', () => {
      catchMayFailUseCase.catch(callback);
      expect(callback).toBeCalledWith(innerError);
      expect(callback).toBeCalledTimes(1);
    });

    it('should return ResultBox with callback value', () => {
      const res = catchMayFailUseCase.catch(callback);
      expect(res.getValue()).toBe(callbackResultValue);
    });
  });
});
