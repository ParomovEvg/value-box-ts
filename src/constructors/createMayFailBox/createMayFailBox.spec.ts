import { createMayFailBox, ThrowError } from './createMayFailBox';
import { ErrorBox, ResultBox } from '../..';

describe('createMayFailBox', () => {
  it('should return value box with constructor return value', () => {
    const res = createMayFailBox(() => 0);
    expect(res).toBeInstanceOf(ResultBox);
    expect(res.unwrap()).toBe(0);
  });
  it('should return error box if constructor call throwError callback', () => {
    const flag = false;

    const res = createMayFailBox(
      (throwError: ThrowError<'error'>): number[] => {
        return new Array(10).fill(1).map(() => {
          if (flag) {
            return 1;
          } else {
            throwError('error');
          }
        });
      }
    );

    expect(res).toBeInstanceOf(ErrorBox);
    expect(res.unwrap()).toBe('error');
  });
});
