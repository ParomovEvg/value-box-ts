import { ResultBox, MayFailBox, ValueBox } from '../..';

export interface MaybeBox<VALUE> {
  map<NEW_VALUE>(fn: (v: VALUE) => NEW_VALUE): MaybeBox<NEW_VALUE>;

  default<NEW_VALUE>(defaultValue: NEW_VALUE): ResultBox<NEW_VALUE | VALUE>;

  chain<NEW_VALUE>(fn: (v: VALUE) => MaybeBox<NEW_VALUE>): MaybeBox<NEW_VALUE>;
  chain<NEW_ERROR, NEW_VALUE>(
    fn: (v: VALUE) => MayFailBox<NEW_ERROR, NEW_VALUE>
  ): ValueBox<NEW_ERROR, NEW_VALUE>;
  chain<NEW_ERROR, NEW_VALUE>(
    fn: (v: VALUE) => ValueBox<NEW_ERROR, NEW_VALUE>
  ): ValueBox<NEW_ERROR, NEW_VALUE>;

  smartMap<NEW_VALUE>(
    fn: (v: VALUE) => NEW_VALUE | undefined | null
  ): MaybeBox<NEW_VALUE>;
  caseOf<RESULT, DEFAULT_RESULT>(obj: {
    result: (fn: VALUE) => RESULT;
    empty: () => DEFAULT_RESULT;
  }): RESULT | DEFAULT_RESULT;
}
