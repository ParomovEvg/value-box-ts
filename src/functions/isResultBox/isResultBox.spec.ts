import {
  getMaybeBoxes,
  getMayFailBoxes,
  getValueBoxes,
} from '../../ValueBox/implementation/__test__/TestValue';
import { isResultBox } from './isResultBox';

describe('isResultBox', () => {
  const valueBoxes = getValueBoxes();
  const maybeBoxes = getMaybeBoxes();
  const mayFailBoxes = getMayFailBoxes();
  it('should return false if call with EmptyBox', () => {
    expect(isResultBox(valueBoxes.empty)).toBe(false);
    expect(isResultBox(maybeBoxes.empty)).toBe(false);
  });
  it('should return false if call with ErrorBox', () => {
    expect(isResultBox(mayFailBoxes.error)).toBe(false);
    expect(isResultBox(valueBoxes.error)).toBe(false);
  });
  it('should return true if call with ResultBox', () => {
    expect(isResultBox(valueBoxes.result)).toBe(true);
    expect(isResultBox(maybeBoxes.result)).toBe(true);
    expect(isResultBox(mayFailBoxes.result)).toBe(true);
  });
});
