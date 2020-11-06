import {
  TestError1,
  TestError2,
  TestValue1,
  TestValue2,
} from '../../ValueBox/implementation/__test__/TestValue';
import { EmptyBox, ErrorBox, mergeObjectOfBoxes, ResultBox } from '../..';

describe('mergeObjectOfBoxes', () => {
  const res1 = TestValue1.get();
  const res2 = TestValue2.get();
  const error1 = TestError1.get();
  const error2 = TestError2.get();

  const resultBoxes = { res1: ResultBox.of(res1), res2: ResultBox.of(res2) };
  const errorBoxes = {
    error1: ErrorBox.of(error1),
    error2: ErrorBox.of(error2),
  };
  const emptyBoxes = { empty1: EmptyBox.get(), empty2: EmptyBox.get() };

  it('should return ResultBox if called with object of ResultBox', () => {
    const res = mergeObjectOfBoxes(resultBoxes);
    expect(res).toBeInstanceOf(ResultBox);
  });
  it('should return ResultBox with initial object inner results', () => {
    const res = mergeObjectOfBoxes(resultBoxes) as ResultBox<any>;
    expect(res.getValue()).toEqual({ res1, res2 });
  });

  it('should return ErrorBox if called with object with ErrorBox', () => {
    const res = mergeObjectOfBoxes({ ...errorBoxes, ...resultBoxes });
    expect(res).toBeInstanceOf(ErrorBox);
  });
  it('should return ErrorBox with first inner error', () => {
    const res = mergeObjectOfBoxes({
      error1:ErrorBox.of(error1),
      ...resultBoxes,
    }) as ErrorBox<TestError1 | TestError2>;
    expect(res.getError()).toBe(error1);
  });
  it('should return EmptyBox if called with object of EmptyBox but without ErrorBox', () => {
    const res = mergeObjectOfBoxes({ ...emptyBoxes, ...resultBoxes });
    expect(res).toBeInstanceOf(EmptyBox);
  });
  it('should return ErrorBox if called with object of EmptyBox and ErrorBox', () => {
    const res = mergeObjectOfBoxes({
      ...emptyBoxes,
      ...errorBoxes,
      ...resultBoxes,
    });
    expect(res).toBeInstanceOf(ErrorBox);
  });
});
