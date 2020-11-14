import {
  EmptyBox,
  ErrorBox,
  MaybeBox,
  MayFailBox,
  ResultBox,
  ValueBox,
} from '../..';
import {
  TestError1,
  TestValue1,
} from '../../ValueBox/implementation/__test__/TestValue';
import { mergeArrayOfBoxes } from './mergeArrayOfBoxes';

describe('mergeArrayOfBoxes', () => {
  const testValuesArray = [TestValue1.get(), TestValue1.get()];
  const testErrorsArray = [TestError1.get(), TestError1.get()];
  const resultBoxArray = testValuesArray.map(v => ResultBox.of(v));
  const errorBoxArray = testErrorsArray.map(v => ErrorBox.of(v));
  const emptyBoxArray = [EmptyBox.get(), EmptyBox.get()];

  const mixedArray: Array<ValueBox<TestError1, TestValue1>> = [
    ...resultBoxArray,
    ...errorBoxArray,
    ...emptyBoxArray,
  ];

  const arrayWithErrors: Array<MayFailBox<TestError1, TestValue1>> = [
    ...resultBoxArray,
    ...errorBoxArray,
  ];

  const arrayWithEmptyBoxes: Array<MaybeBox<TestValue1>> = [
    ...resultBoxArray,
    ...emptyBoxArray,
  ];

  test('types', () => {
    const res1: ValueBox<TestError1, Array<TestValue1>> = mergeArrayOfBoxes(
      mixedArray
    );
    expect(res1);
    const res2: MayFailBox<TestError1, TestValue1[]> = mergeArrayOfBoxes(
      arrayWithErrors
    );
    expect(res2);
    const res3: ResultBox<TestValue1[]> = mergeArrayOfBoxes(
      arrayWithEmptyBoxes
    );
    expect(res3);
  });

  it('should return result box if called with result boxes array', () => {
    const res = mergeArrayOfBoxes(resultBoxArray);
    expect(res).toBeInstanceOf(ResultBox);
  });
  it('should return result box, with inner values array', () => {
    const res = mergeArrayOfBoxes(resultBoxArray);
    expect(res.getValue()).toEqual(testValuesArray);
  });
  it('should return result box if called with result and empty boxes array', () => {
    const res = mergeArrayOfBoxes(arrayWithEmptyBoxes);
    expect(res).toBeInstanceOf(ResultBox);
  });
  it('should return result box, with inner result boxes values', () => {
    const res = mergeArrayOfBoxes(arrayWithEmptyBoxes);
    expect(res.getValue()).toEqual(testValuesArray);
  });
  it('should return error box if called with error boxes array', () => {
    const res = mergeArrayOfBoxes(arrayWithErrors);
    expect(res).toBeInstanceOf(ErrorBox);
  });
  it('should return error box with first error', () => {
    const res = mergeArrayOfBoxes(arrayWithErrors);
    const callback = jest.fn((_: TestError1) => {});
    res.catch(callback);
    expect(callback).toBeCalledWith(testErrorsArray[0]);
  });
});
