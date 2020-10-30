import { EmptyBox } from '../EmptyBox';
import { TestError, TestValue, TestValue1 } from './TestValue';
import { IsEmptyUseCase } from '../../useCases/IsEmptyUseCase';
import { IsErrorUseCase } from '../../useCases/IsErrorUseCase';
import { IsResultUseCase } from '../../useCases/IsResultUseCase';
import {
  MapMaybeBoxUseCase,
  MapValueBoxUseCase,
} from '../../useCases/MapUseCase';
import { CatchValueBoxUseCase } from '../../useCases/CatchUseCase';
import { DefaultMaybeBoxUseCase } from '../../useCases/DefaultUseCase';
import { ResultBox } from '../ResultBox';

describe('EmptyBox', () => {
  describe('get static method', () => {
    it('should create EmptyBox instance', () => {
      const emptyBox = EmptyBox.get();
      expect(emptyBox).toBeInstanceOf(EmptyBox);
    });

    it('should get single tone', () => {
      const emptyBox1 = EmptyBox.get();
      const emptyBox2 = EmptyBox.get();
      expect(emptyBox1).toBe(emptyBox2);
    });
  });

  describe('isEmpty use case', () => {
    const emptyBox: IsEmptyUseCase = EmptyBox.get();
    it('should return true', () => {
      expect(emptyBox.isEmpty).toEqual(true);
    });
  });

  describe('isError use case', () => {
    const emptyBox: IsErrorUseCase = EmptyBox.get();
    it('should return false', () => {
      expect(emptyBox.isError).toEqual(false);
    });
  });

  describe('isResult use case', () => {
    const emptyBox: IsResultUseCase = EmptyBox.get();
    it('should return false', () => {
      expect(emptyBox.isResult).toEqual(false);
    });
  });

  describe('map use case', () => {
    beforeEach(() => jest.clearAllMocks());
    const callback = jest.fn() as (v: TestValue) => TestValue1;
    const mapMaybeBoxUseCase: MapMaybeBoxUseCase<TestValue> = EmptyBox.get();
    const mapValueBoxUseCase: MapValueBoxUseCase<
      TestError,
      TestValue
    > = EmptyBox.get();

    it('should return EmptyBox', () => {
      const res = mapValueBoxUseCase.map(callback);
      expect(res).toBeInstanceOf(EmptyBox);
    });
    it('should not call callback', () => {
      mapMaybeBoxUseCase.map(callback);
      expect(callback).not.toBeCalled();
    });
  });

  describe('catch method', () => {
    const catchValueBoxUseCase: CatchValueBoxUseCase<
      TestError,
      TestValue
    > = EmptyBox.get();
    it('should be in ValueBox', () => {
      const callback = jest.fn() as (e: TestError) => TestValue;
      catchValueBoxUseCase.catch(callback);
    });
    it('should return EmptyBox', () => {
      const callback = jest.fn() as (e: TestError) => TestValue;
      const result = catchValueBoxUseCase.catch(callback);
      expect(result).toBeInstanceOf(EmptyBox);
    });
    it('should not call callback', () => {
      const callback = jest.fn() as (e: TestError) => TestValue;
      catchValueBoxUseCase.catch(callback);
      expect(callback).not.toBeCalled();
    });
  });

  describe('default method', () => {
    const defaultMaybeUseCase: DefaultMaybeBoxUseCase<TestValue> = EmptyBox.get();
    const defaultValueBoxUseCase: DefaultMaybeBoxUseCase<TestValue> = EmptyBox.get();
    const defaultValue = TestValue.get();

    it('should return ResultBox ', () => {
      const result = defaultValueBoxUseCase.default(defaultValue);
      expect(result).toBeInstanceOf(ResultBox);
    });
    it('should return ResultBox with default value', () => {
      const result = defaultMaybeUseCase.default(defaultValue);
      expect(result.getValue()).toBe(defaultValue);
    });
  });
});
