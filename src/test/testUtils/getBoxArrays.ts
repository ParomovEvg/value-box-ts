import { TestError1, TestValue1 } from '../../ValueBox/implementation/__test__/TestValue';
import { EmptyBox, ErrorBox, MaybeBox, MayFailBox, ResultBox, ValueBox } from '../..';

export function getBoxArrays() {
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

  return {
    mixedArray,
    arrayWithErrors,
    arrayWithEmptyBoxes,
    testValuesArray,
    testErrorsArray,
    resultBoxArray,
    errorBoxArray,
    emptyBoxArray,
  };
}