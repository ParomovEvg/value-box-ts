import { MaybeBox } from '../..';
import { MayFailBox } from '../..';
import { ValueBox } from '../..';

export interface MapMaybeBoxUseCase<VALUE> {
  map<NEW_VALUE>(fn: (v: VALUE) => NEW_VALUE): MaybeBox<NEW_VALUE>;
}

export interface MapMayFailBoxUseCase<ERROR, VALUE> {
  map<NEW_VALUE>(fn: (v: VALUE) => NEW_VALUE): MayFailBox<ERROR, NEW_VALUE>;
}

export interface MapValueBoxUseCase<ERROR, VALUE> {
  map<NEW_VALUE>(fn: (v: VALUE) => NEW_VALUE): ValueBox<ERROR, NEW_VALUE>;
}
