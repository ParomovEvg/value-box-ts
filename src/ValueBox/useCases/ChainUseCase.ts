import { MaybeBox, MayFailBox, ValueBox } from '../..';

export interface ChainValueBoxUseCase<ERROR, VALUE> {
  chain<NEW_ERROR, NEW_VALUE>(
    fn: (v: VALUE) => ValueBox<NEW_ERROR, NEW_VALUE>
  ): ValueBox<NEW_ERROR | ERROR, NEW_VALUE>;
  chain<NEW_ERROR, NEW_VALUE>(
    fn: (v: VALUE) => MayFailBox<NEW_ERROR, NEW_VALUE>
  ): ValueBox<NEW_ERROR | ERROR, NEW_VALUE>;
  chain<NEW_VALUE>(
    fn: (v: VALUE) => MaybeBox<NEW_VALUE>
  ): ValueBox<ERROR, NEW_VALUE>;
}

export interface ChainMaybeUseCase<VALUE> {
  chain<NEW_VALUE>(fn: (v: VALUE) => MaybeBox<NEW_VALUE>): MaybeBox<NEW_VALUE>;
  chain<NEW_ERROR, NEW_VALUE>(
    fn: (v: VALUE) => MayFailBox<NEW_ERROR, NEW_VALUE>
  ): ValueBox<NEW_ERROR, NEW_VALUE>;
  chain<NEW_ERROR, NEW_VALUE>(
      fn: (v: VALUE) => ValueBox<NEW_ERROR, NEW_VALUE>
  ): ValueBox<NEW_ERROR, NEW_VALUE>;
}

export interface ChainMayFailUseCase<ERROR, VALUE> {
  chain<NEW_ERROR, NEW_VALUE>(
      fn: (v: VALUE) => MayFailBox<NEW_ERROR, NEW_VALUE>
  ): MayFailBox<NEW_ERROR | ERROR, NEW_VALUE>;
  chain<NEW_VALUE>(
      fn: (v: VALUE) => MaybeBox<NEW_VALUE>
  ): ValueBox<ERROR, NEW_VALUE>;
  chain<NEW_ERROR, NEW_VALUE>(
      fn: (v: VALUE) => ValueBox<NEW_ERROR, NEW_VALUE>
  ): ValueBox<NEW_ERROR | ERROR, NEW_VALUE>;
}
