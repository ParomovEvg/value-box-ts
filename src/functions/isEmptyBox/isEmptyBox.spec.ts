import {
  getMaybeBoxes,
  getValueBoxes,
} from '../../ValueBox/implementation/__test__/TestValue';
import { isEmptyBox } from './isEmptyBox';

describe('isEmptyBox', () => {
  const valueBoxes = getValueBoxes();
  const maybeBoxes = getMaybeBoxes();
  it('should return true if call with EmptyBox', () => {
    expect(isEmptyBox(valueBoxes.empty)).toBe(true);
    expect(isEmptyBox(maybeBoxes.empty)).toBe(true);
  });
  it('should return false if call with ErrorBox', () => {
    expect(isEmptyBox(valueBoxes.error)).toBe(false);
  });
  it('should return false if call with ResultBox', () => {
    expect(isEmptyBox(valueBoxes.result)).toBe(false);
    expect(isEmptyBox(maybeBoxes.result)).toBe(false);
  });
});
