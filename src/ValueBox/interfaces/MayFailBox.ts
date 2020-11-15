import { ResultBox, MaybeBox, ValueBox } from '../..';

export interface MayFailBox<ERROR, VALUE> {
  map<NEW_VALUE>(fn: (v: VALUE) => NEW_VALUE): MayFailBox<ERROR, NEW_VALUE>;

  catch<NEW_VALUE>(fn: (e: ERROR) => NEW_VALUE): ResultBox<NEW_VALUE | VALUE>;

  chain<NEW_ERROR, NEW_VALUE>(
    fn: (v: VALUE) => MayFailBox<NEW_ERROR, NEW_VALUE>
  ): MayFailBox<NEW_ERROR | ERROR, NEW_VALUE>;

  chain<NEW_VALUE>(
    fn: (v: VALUE) => MaybeBox<NEW_VALUE>
  ): ValueBox<ERROR, NEW_VALUE>;

  chain<NEW_ERROR, NEW_VALUE>(
    fn: (v: VALUE) => ValueBox<NEW_ERROR, NEW_VALUE>
  ): ValueBox<NEW_ERROR | ERROR, NEW_VALUE>;

  smartMap<NEW_VALUE>(
    fn: (v: VALUE) => NEW_VALUE | undefined | null
  ): ValueBox<ERROR, NEW_VALUE>;

  caseOf<RESULT, ERROR_RESULT>(obj: {
    result: (fn: VALUE) => RESULT;
    error: (fn: ERROR) => ERROR_RESULT;
  }): RESULT | ERROR_RESULT;

  onResult(fn: (v: VALUE) => void): MayFailBox<ERROR, VALUE>;

  onError(fn: (e: ERROR) => void): MayFailBox<ERROR, VALUE>;
}
