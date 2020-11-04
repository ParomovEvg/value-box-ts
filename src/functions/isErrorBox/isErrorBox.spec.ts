import {
  getMayFailBoxes,
  getValueBoxes,
} from '../../ValueBox/implementation/__test__/TestValue';
import { isErrorBox } from './isErrorBox';

describe('isErrorBox', () => {
  const valueBoxes = getValueBoxes();
  const mayFailBoxes = getMayFailBoxes();
  it('should return false if call with EmptyBox', () => {
    expect(isErrorBox(valueBoxes.empty)).toBe(false);
  });
  it('should return true if call with ErrorBox', () => {
    expect(isErrorBox(valueBoxes.error)).toBe(true);
    expect(isErrorBox(mayFailBoxes.error)).toBe(true);
  });
  it('should return false if call with ResultBox', () => {
    expect(isErrorBox(valueBoxes.result)).toBe(false);
    expect(isErrorBox(mayFailBoxes.result)).toBe(false);
  });
});
