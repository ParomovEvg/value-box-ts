import { SmartMapMayFailBoxUseCase } from './../../useCases/SmartMapUseCase';
import { ErrorBox } from '../ErrorBox';
import { ResultBox, ValueBox } from '../../..';
import { TestError, TestError1, TestValue, TestValue1 } from './TestValue';
import { MapMayFailBoxUseCase } from '../../useCases/MapUseCase';
import {
  CatchMayFailBoxUseCase,
  CatchValueBoxUseCase,
} from '../../useCases/CatchUseCase';
import { ChainMayFailUseCase } from '../../useCases/ChainUseCase';

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

  describe('chain method', () => {
    const callbackValueBox: () => ValueBox<TestError1, TestValue1> = () =>
      ResultBox.of(TestValue1.get());
    const chainMayFailUseCase: ChainMayFailUseCase<
      TestError,
      TestValue
    > = ErrorBox.of(TestError.get());

    it('should return this', () => {
      const res = chainMayFailUseCase.chain(callbackValueBox);
      expect(res).toBe(chainMayFailUseCase);
    });

    it('should not call callback', () => {
      const callback = jest.fn();
      chainMayFailUseCase.chain(callback);
      expect(callback).not.toBeCalled();
    });
  });

  describe('smartMap method', () => {
    const callbackValueBox: () => ValueBox<TestError1, TestValue1> = () =>
      ResultBox.of(TestValue1.get());
    const smartMapMayFailBoxUseCase: SmartMapMayFailBoxUseCase<
      TestError,
      TestValue
    > = ErrorBox.of(TestError.get());

    it('should return this', () => {
      const res = smartMapMayFailBoxUseCase.smartMap(callbackValueBox);
      expect(res).toBe(smartMapMayFailBoxUseCase);
    });

    it('should not call callback', () => {
      const callback = jest.fn();
      smartMapMayFailBoxUseCase.smartMap(callback);
      expect(callback).not.toBeCalled();
    });
  });

  describe('caseOf method', () => {
    beforeEach(() => jest.clearAllMocks());
    const errorCallbackResult = 'emptyCallbackResult';
    const innerError = TestError.get();
    const empty = jest.fn();
    const result = jest.fn();
    const error = jest.fn(() => errorCallbackResult);
    const errorBox: ValueBox<any, any> = ErrorBox.of(innerError);
    it('should call error callback with innerError', () => {
      errorBox.caseOf({
        error,
        result,
        empty,
      });
      expect(error).toHaveBeenCalledWith(innerError);
    });
    it('should return error callback return value', () => {
      const res = errorBox.caseOf({
        error,
        result,
        empty,
      });
      expect(res).toBe(errorCallbackResult);
    });
    it('should not call another callback', () => {
      errorBox.caseOf({
        error,
        result,
        empty,
      });
      expect(empty).not.toHaveBeenCalled();
      expect(result).not.toHaveBeenCalled();
    });
  });
});
