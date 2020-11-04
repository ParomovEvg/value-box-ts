import { MaybeBox, MayFailBox, ValueBox } from '../..';

export interface OnResultValueBoxUseCase<ERROR, VALUE> {
  onResult(fn: (v: VALUE) => void): ValueBox<ERROR, VALUE>;
}
export interface OnResultMaybeBoxUseCase<VALUE> {
  onResult(fn: (v: VALUE) => void): MaybeBox<VALUE>;
}
export interface OnResultMayFailBoxUseCase<ERROR, VALUE> {
  onResult(fn: (v: VALUE) => void): MayFailBox<ERROR, VALUE>;
}
