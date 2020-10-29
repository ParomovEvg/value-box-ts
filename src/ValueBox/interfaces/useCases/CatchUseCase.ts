import { MaybeBox, ResultBox } from '../../..';

export interface MayFailCatchUseCase<ERROR, VALUE> {
  catch<NEW_VALUE>(
    fn: (e: ERROR) => NEW_VALUE
  ): ResultBox<never, NEW_VALUE | VALUE>;
}

export interface ValueCatchUseCase<ERROR, VALUE> {
  catch<NEW_VALUE>(fn: (e: ERROR) => NEW_VALUE): MaybeBox<NEW_VALUE | VALUE>;
}
