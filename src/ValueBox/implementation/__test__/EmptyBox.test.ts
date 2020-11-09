import { EmptyBox } from '../EmptyBox';
import { TestError, TestError1, TestValue, TestValue1 } from './TestValue';
import {
  MapMaybeBoxUseCase,
  MapValueBoxUseCase,
} from '../../useCases/MapUseCase';
import { CatchValueBoxUseCase } from '../../useCases/CatchUseCase';
import { DefaultMaybeBoxUseCase } from '../../useCases/DefaultUseCase';
import { ResultBox } from '../ResultBox';
import { ChainMaybeUseCase } from '../../useCases/ChainUseCase';
import { ValueBox } from '../../..';
import { SmartMapMaybeBoxUseCase } from '../../useCases/SmartMapUseCase';

describe('EmptyBox', () => {
  describe('get static method', () => {
    it('should create EmptyBox instance', () => {
      const emptyBox = EmptyBox.of();
      expect(emptyBox).toBeInstanceOf(EmptyBox);
    });

    it('should get single tone', () => {
      const emptyBox1 = EmptyBox.of();
      const emptyBox2 = EmptyBox.of();
      expect(emptyBox1).toBe(emptyBox2);
    });
  });

  describe('map use case', () => {
    beforeEach(() => jest.clearAllMocks());
    const callback = jest.fn() as (v: TestValue) => TestValue1;
    const mapMaybeBoxUseCase: MapMaybeBoxUseCase<TestValue> = EmptyBox.of();
    const mapValueBoxUseCase: MapValueBoxUseCase<
      TestError,
      TestValue
    > = EmptyBox.of();

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
    > = EmptyBox.of();
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
    const defaultMaybeUseCase: DefaultMaybeBoxUseCase<TestValue> = EmptyBox.of();
    const defaultValueBoxUseCase: DefaultMaybeBoxUseCase<TestValue> = EmptyBox.of();
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

  describe('chain use case', () => {
    const callbackValueBox: () => ValueBox<TestError1, TestValue1> = () =>
      ResultBox.of(TestValue1.get());

    const chainMaybeUseCase: ChainMaybeUseCase<TestValue> = EmptyBox.of();

    it('should return this', () => {
      const res = chainMaybeUseCase.chain(callbackValueBox);
      expect(res).toBe(chainMaybeUseCase);
    });

    it('should not call callback', () => {
      const callback = jest.fn();
      chainMaybeUseCase.chain(callback);
      expect(callback).not.toBeCalled();
    });
  });

  describe('smartMap method', () => {
    const callbackValueBox: () => ValueBox<TestError1, TestValue1> = () =>
      ResultBox.of(TestValue1.get());

    const smartMapMaybeBoxUseCase: SmartMapMaybeBoxUseCase<TestValue> = EmptyBox.of();

    it('should return this', () => {
      const res = smartMapMaybeBoxUseCase.smartMap(callbackValueBox);
      expect(res).toBe(smartMapMaybeBoxUseCase);
    });

    it('should not call callback', () => {
      const callback = jest.fn();
      smartMapMaybeBoxUseCase.smartMap(callback);
      expect(callback).not.toBeCalled();
    });
  });
});
