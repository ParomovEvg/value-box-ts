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
  test('types', () => {
    const array1: Array<ValueBox<TestError1, TestValue1>> = [
      ResultBox.of(TestValue1.get()),
      ErrorBox.of(TestError1.get()),
      EmptyBox.get(),
    ];
    const res1: ValueBox<TestError1, Array<TestValue1>> = mergeArrayOfBoxes(
      array1
    );
    expect(res1);
    const array2: Array<MayFailBox<TestError1, TestValue1>> = [
      ResultBox.of(TestValue1.get()),
      ErrorBox.of(TestError1.get()),
      ResultBox.of(TestValue1.get()),
      ErrorBox.of(TestError1.get()),
    ];
    const res2: MayFailBox<TestError1, TestValue1[]> = mergeArrayOfBoxes(
      array2
    );
    expect(res2);
    const array3: Array<MaybeBox<TestValue1>> = [
      ResultBox.of(TestValue1.get()),
      ResultBox.of(TestValue1.get()),
      EmptyBox.get(),
    ];
    const res3: ResultBox<TestValue1[]> = mergeArrayOfBoxes(array3);
    expect(res3);
  });


  it('should return result box if called with result boxes array', () => {
    const resultsArray: MaybeBox<TestValue1>[] = [
      ResultBox.of(TestValue1.get()),
      ResultBox.of(TestValue1.get()),
      ResultBox.of(TestValue1.get()),
    ];
    const res = mergeArrayOfBoxes(resultsArray);
    expect(res).toBeInstanceOf(ResultBox);
  });
});
