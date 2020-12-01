import { createMaybeBox } from './createMaybeBox';
import { EmptyBox, ResultBox } from '../..';

describe('createMaybeBox', () => {
  it('should return empty box if called with undefined', () => {
    const res = createMaybeBox(undefined);
    expect(res).toBeInstanceOf(EmptyBox);
  });
  it('should return empty box if called with null', () => {
    const res = createMaybeBox(null);
    expect(res).toBeInstanceOf(EmptyBox);
  });
  it('should return result box with first argument, if it not null or undefined', () => {
    const res = createMaybeBox(0);
    expect(res).toBeInstanceOf(ResultBox);
    expect(res.unwrap()).toBe(0);
  });
});
