import { MaybeBox, ValueBox } from '../..';

export interface OnEmptyValueBoxUseCase<ERROR, VALUE> {
  onEmpty(fn: () => void): ValueBox<ERROR, VALUE>;
}
export interface OnEmptyMaybeBoxUseCase<VALUE> {
  onEmpty(fn: () => void): MaybeBox<VALUE>;
}
