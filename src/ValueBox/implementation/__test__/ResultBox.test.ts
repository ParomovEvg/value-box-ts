import { ResultBox } from '../ResultBox';
import { TestError, TestValue, TestValue1 } from './TestValue';
import {
  MapMaybeBoxUseCase,
  MapMayFailBoxUseCase,
  MapValueBoxUseCase,
} from '../../useCases/MapUseCase';
import {
  CatchMayFailBoxUseCase,
  CatchValueBoxUseCase,
} from '../../useCases/CatchUseCase';
import { ChainValueBoxUseCase } from '../../useCases/ChainUseCase';
import {
  SmartMapMaybeBoxUseCase,
  SmartMapMayFailBoxUseCase,
  SmartMapValueBoxUseCase,
} from '../../useCases/SmartMapUseCase';
import { EmptyBox, ValueBox } from '../../..';

describe('ResultBox', () => {
  const innerValue = TestValue.get();
  const resultBox = ResultBox.of(innerValue);

  describe('get static method', () => {
    it('should return ResultBox instance', () => {
      expect(resultBox).toBeInstanceOf(ResultBox);
    });
  });

  describe('getValue method', () => {
    it('should return inner value', () => {
      const result = resultBox.getValue();
      expect(result).toBe(innerValue);
    });
  });

  describe('map useCase', () => {
    const callbackResult = TestValue1.get();
    const callback = jest.fn((_: TestValue) => callbackResult);
    beforeEach(() => jest.clearAllMocks());

    const mapValueBoxUseCase: MapValueBoxUseCase<
      TestError,
      TestValue
    > = resultBox;
    const mapMayFailBoxUseCase: MapMayFailBoxUseCase<
      TestError,
      TestValue
    > = resultBox;
    const mapMaybeBoxUseCase: MapMaybeBoxUseCase<TestValue> = resultBox;

    it('should return ResultBox ', () => {
      const result1 = mapValueBoxUseCase.map(callback);
      const result2 = mapMayFailBoxUseCase.map(callback);
      expect(result1).toBeInstanceOf(ResultBox);
      expect(result2).toBeInstanceOf(ResultBox);
    });

    it('should be called with innerValue', () => {
      mapMaybeBoxUseCase.map(callback);
      expect(callback).toBeCalledWith(innerValue);
    });

    it('should be return ResultBox with callbackResult', () => {
      const result = resultBox.map(callback);
      expect(result.getValue()).toBe(callbackResult);
    });
  });

  describe('smartMap use case', () => {
    const callbackResult = TestValue1.get();
    const callback = jest.fn((_: TestValue) => callbackResult);
    beforeEach(() => jest.clearAllMocks());

    const smartMapValueBoxUseCase: SmartMapValueBoxUseCase<
      TestError,
      TestValue
    > = resultBox;

    const smartMapMaybeBoxUseCase: SmartMapMaybeBoxUseCase<TestValue> = resultBox;

    const smartMapMayFailBoxUseCase: SmartMapMayFailBoxUseCase<
      TestError,
      TestValue
    > = resultBox;

    it('should return ResultBox', () => {
      const result1 = smartMapValueBoxUseCase.smartMap(callback);
      const result2 = smartMapMaybeBoxUseCase.smartMap(callback);
      expect(result1).toBeInstanceOf(ResultBox);
      expect(result2).toBeInstanceOf(ResultBox);
    });

    it('should be called with innerValue', () => {
      smartMapMayFailBoxUseCase.smartMap(callback);
      expect(callback).toBeCalledWith(innerValue);
    });

    it('should be return ResultBox with callbackResult', () => {
      const result = resultBox.map(callback);
      expect(result.getValue()).toBe(callbackResult);
    });

    it('should be return EmptyBox with undefined callback result', () => {
      const callback1 = jest.fn((_: TestValue) => undefined);
      const result = resultBox.smartMap(callback1);

      expect(result).toBeInstanceOf(EmptyBox);
    });

    it('should be return EmptyBox with null callback result', () => {
      const callback1 = jest.fn((_: TestValue) => null);
      const result = resultBox.smartMap(callback1);

      expect(result).toBeInstanceOf(EmptyBox);
    });
  });

  describe('catch method', () => {
    const callback = jest.fn() as (v: TestError) => TestValue;

    const mapValueBoxUseCase: CatchValueBoxUseCase<
      TestError,
      TestValue
    > = resultBox;

    const mapMayFailBoxUseCase: CatchMayFailBoxUseCase<
      TestError,
      TestValue
    > = resultBox;

    it('should return this', () => {
      const result = mapValueBoxUseCase.catch(callback);
      expect(result).toBe(mapValueBoxUseCase);
    });

    it('should not call callback', () => {
      mapMayFailBoxUseCase.catch(callback);
      expect(callback).not.toBeCalled();
    });
  });

  describe('chain method', () => {
    beforeEach(() => jest.clearAllMocks());
    const callbackResult = ResultBox.of(TestValue1.get());
    const callback = jest.fn(() => callbackResult);
    const chainValueBoxUseCase: ChainValueBoxUseCase<
      TestError,
      TestValue
    > = resultBox;

    it('should return callback result', () => {
      const res = chainValueBoxUseCase.chain(callback);
      expect(res).toBe(callbackResult);
    });
    it('should call callback with inner value', () => {
      chainValueBoxUseCase.chain(callback);
      expect(callback).toBeCalledWith(innerValue);
    });
  });

  describe('caseOf method', () => {
    beforeEach(() => jest.clearAllMocks());
    const resultCallbackResult = 'resultCallbackResult';
    const innerValue = TestValue.get();
    const empty = jest.fn();
    const result = jest.fn(() => resultCallbackResult);
    const error = jest.fn();
    const resultBox: ValueBox<any, any> = ResultBox.of(innerValue);
    it('should call error callback with innerError', () => {
      resultBox.caseOf({
        error,
        result,
        empty,
      });
      expect(result).toHaveBeenCalledWith(innerValue);
    });
    it('should return error callback return value', () => {
      const res = resultBox.caseOf({
        error,
        result,
        empty,
      });
      expect(res).toBe(resultCallbackResult);
    });
    it('should not call another callback', () => {
      resultBox.caseOf({
        error,
        result,
        empty,
      });
      expect(empty).not.toHaveBeenCalled();
      expect(error).not.toHaveBeenCalled();
    });
  });
});
