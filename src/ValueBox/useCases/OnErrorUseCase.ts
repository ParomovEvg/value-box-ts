import { MayFailBox, ValueBox } from '../..';

export interface OnErrorValueBoxUseCase<ERROR, VALUE> {
  onError(fn: (e: ERROR) => void): ValueBox<ERROR, VALUE>;
}
export interface OnErrorMayFailBoxUseCase<ERROR, VALUE> {
  onError(fn: (e: ERROR) => void): MayFailBox<ERROR, VALUE>;
}
