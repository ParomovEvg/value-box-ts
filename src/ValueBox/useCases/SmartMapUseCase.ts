import { MaybeBox, ValueBox } from '../..';

export interface SmartMapValueBoxUseCase<ERROR, VALUE> {
  smartMap<NEW_VALUE>(
    fn: (v: VALUE) => NEW_VALUE | undefined | null
  ): ValueBox<ERROR, NEW_VALUE>;
}

export interface SmartMapMaybeBoxUseCase<VALUE> {
  smartMap<NEW_VALUE>(
    fn: (v: VALUE) => NEW_VALUE | undefined | null
  ): MaybeBox<NEW_VALUE>;
}

export interface SmartMapMayFailBoxUseCase<ERROR, VALUE> {
  smartMap<NEW_VALUE>(
    fn: (v: VALUE) => NEW_VALUE | undefined | null
  ): ValueBox<ERROR, NEW_VALUE>;
}
