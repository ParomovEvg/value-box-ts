import { MaybeBox } from '../MaybeBox';
import { MayFailBox } from '../MayFailBox';
import { ValueBox } from '../ValueBox';

export interface MaybeMapUseCase<VALUE> {
  map<NEW_VALUE>(fn: (v: VALUE) => NEW_VALUE): MaybeBox<NEW_VALUE>;
}

export interface MayFailMapUseCase<ERROR, VALUE> {
  map<NEW_VALUE>(fn: (v: VALUE) => NEW_VALUE): MayFailBox<ERROR, NEW_VALUE>;
}

export interface ValueMapUseCase<ERROR, VALUE> {
  map<NEW_VALUE>(fn: (v: VALUE) => NEW_VALUE): ValueBox<ERROR, NEW_VALUE>;
}
