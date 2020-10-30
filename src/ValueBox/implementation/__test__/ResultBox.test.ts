import { ResultBox } from '../ResultBox';
import { TestError, TestValue, TestValue1 } from './TestValue';
import { IsEmptyUseCase } from '../../useCases/IsEmptyUseCase';
import { IsErrorUseCase } from '../../useCases/IsErrorUseCase';
import { IsResultUseCase } from '../../useCases/IsResultUseCase';
import {
  MapMaybeBoxUseCase,
  MapMayFailBoxUseCase,
  MapValueBoxUseCase,
} from '../../useCases/MapUseCase';
import {
  CatchMayFailBoxUseCase,
  CatchValueBoxUseCase,
} from '../../useCases/CatchUseCase';

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

  describe('IsEmptyUseCase', () => {
    const isEmptyUseCase: IsEmptyUseCase = resultBox;
    it('should return false', () => {
      expect(isEmptyUseCase.isEmpty).toEqual(false);
    });
  });
  describe('IsErrorUseCase', () => {
    const isErrorUseCase: IsErrorUseCase = resultBox;
    it('should return false', () => {
      expect(isErrorUseCase.isError).toEqual(false);
    });
  });
  describe('isResult getter', () => {
    const isResultUseCase: IsResultUseCase = resultBox;
    it('should return true', () => {
      expect(isResultUseCase.isResult).toEqual(true);
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
});
