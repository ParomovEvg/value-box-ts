import { MaybeBox, MayFailBox } from '../..';

export interface ValueBox<ERROR, VALUE> {
  map<NEW_VALUE>(fn: (v: VALUE) => NEW_VALUE): ValueBox<ERROR, NEW_VALUE>;

  catch<NEW_VALUE>(fn: (e: ERROR) => NEW_VALUE): MaybeBox<NEW_VALUE | VALUE>;

  default<NEW_VALUE>(
    defaultValue: NEW_VALUE
  ): MayFailBox<ERROR, NEW_VALUE | VALUE>;

  chain<NEW_ERROR, NEW_VALUE>(
    fn: (v: VALUE) => ValueBox<NEW_ERROR, NEW_VALUE>
  ): ValueBox<NEW_ERROR | ERROR, NEW_VALUE>;
  chain<NEW_ERROR, NEW_VALUE>(
    fn: (v: VALUE) => MayFailBox<NEW_ERROR, NEW_VALUE>
  ): ValueBox<NEW_ERROR | ERROR, NEW_VALUE>;
  chain<NEW_VALUE>(
    fn: (v: VALUE) => MaybeBox<NEW_VALUE>
  ): ValueBox<ERROR, NEW_VALUE>;

  smartMap<NEW_VALUE>(
    fn: (v: VALUE) => NEW_VALUE | undefined | null
  ): ValueBox<ERROR, NEW_VALUE>;

  caseOf<RESULT, ERROR_RESULT, DEFAULT_RESULT>(obj: {
    result: (fn: VALUE) => RESULT;
    error: (fn: ERROR) => ERROR_RESULT;
    empty: () => DEFAULT_RESULT;
  }): RESULT | ERROR_RESULT | DEFAULT_RESULT;

  onResult(fn: (v: VALUE) => void): ValueBox<ERROR, VALUE>;
  onEmpty(fn: () => void): ValueBox<ERROR, VALUE>;
  onError(fn: (e: ERROR) => void): ValueBox<ERROR, VALUE>;
}
