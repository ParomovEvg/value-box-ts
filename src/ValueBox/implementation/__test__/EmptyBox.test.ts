import { EmptyBox } from '../EmptyBox';
import { MaybeBox, ValueBox } from '../../..';
import {TestError, TestValue, TestValue1} from './TestValue';

describe('EmptyBox', () => {
  const valueBox: ValueBox<TestError, TestValue> = EmptyBox.get();
  const maybeBox: MaybeBox<TestValue> = EmptyBox.get();
  const emptyBox = EmptyBox.get();

  describe('get static method', () => {
    it('should create EmptyBox instance', () => {
      const valueBox: ValueBox<TestError, TestValue> = EmptyBox.get();
      const maybeBox: MaybeBox<TestValue> = EmptyBox.get();
      expect(valueBox).toBeInstanceOf(EmptyBox);
      expect(maybeBox).toBeInstanceOf(EmptyBox);
    });

    it('should get single tone', () => {
      const emptyBox1 = EmptyBox.get();
      const emptyBox2 = EmptyBox.get();
      expect(emptyBox1).toBe(emptyBox2);
    });
  });

  describe('isEmpty getter', () => {
    it('should return true', () => {
      expect(emptyBox.isEmpty).toEqual(true);
    });
  });

  describe('isError getter', () => {
    it('should return false', () => {
      expect(emptyBox.isError).toEqual(false);
    });
  });

  describe('isResult getter', () => {
    it('should return false', () => {
      expect(emptyBox.isResult).toEqual(false);
    });
  });

  describe('map method', () => {
    it('should be in ValueBox and MaybeBox', () => {
      const callback = jest.fn() as (v: TestValue) => TestValue1;
      valueBox.map(callback);
      maybeBox.map(callback);
    });
    it('should return EmptyBox', () => {
      const callback = jest.fn();
      const res = valueBox.map(callback);
      expect(res).toBeInstanceOf(EmptyBox);
    });
    it('should not call callback', () => {
      const callback = jest.fn();
      valueBox.map(callback);
      expect(callback).not.toBeCalled();
    });
  });

  describe('catch method', () => {
    it('should be in ValueBox', () => {
      const callback = jest.fn() as (e: TestError) => TestValue;
      valueBox.catch(callback);
    });
    it('should return EmptyBox', () => {
      const callback = jest.fn() as (e: TestError) => TestValue;
      const result = valueBox.catch(callback);
      expect(result).toBeInstanceOf(EmptyBox);
    });
    it('should not call callback', () => {
      const callback = jest.fn() as (e: TestError) => TestValue;
      valueBox.catch(callback);
      expect(callback).not.toBeCalled();
    });
  });
});
