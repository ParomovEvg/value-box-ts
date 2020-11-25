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
import { mergeArrayOfBoxesStrict } from './mergeArrayOfBoxesStrict';
import { getBoxArrays } from '../../test/testUtils/getBoxArrays';

describe('mergeArrayOfBoxes', () => {
  const {
    resultBoxArray,
    testErrorsArray,
    testValuesArray,
    arrayWithEmptyBoxes,
    arrayWithErrors,
    mixedArray,
  } = getBoxArrays();

  test('types', () => {
    const res1: ValueBox<
      TestError1,
      Array<TestValue1>
    > = mergeArrayOfBoxesStrict(mixedArray);
    expect(res1);
    const res2: MayFailBox<TestError1, TestValue1[]> = mergeArrayOfBoxesStrict(
      arrayWithErrors
    );
    expect(res2);
    const res3: MaybeBox<TestValue1[]> = mergeArrayOfBoxesStrict(
      arrayWithEmptyBoxes
    );
    expect(res3);
  });
  it('should return result box if called with result boxes array', () => {
    const res = mergeArrayOfBoxesStrict(resultBoxArray);
    expect(res).toBeInstanceOf(ResultBox);
  });
  it('should return result box, with inner values array', () => {
    const res = mergeArrayOfBoxesStrict(resultBoxArray);
    expect(res.unwrap()).toEqual(testValuesArray);
  });
  it('should return empty box if called with result and empty boxes array', () => {
    const res = mergeArrayOfBoxesStrict(arrayWithEmptyBoxes);
    expect(res).toBeInstanceOf(EmptyBox);
  });
  it('should return error box if called with error boxes array', () => {
    const res = mergeArrayOfBoxesStrict(arrayWithErrors);
    expect(res).toBeInstanceOf(ErrorBox);
  });
  it('should return error box with first error', () => {
    const res = mergeArrayOfBoxesStrict(arrayWithErrors);
    expect(res.unwrap()).toBe(testErrorsArray[0]);
  });
});
