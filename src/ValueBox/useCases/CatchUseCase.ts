import { MaybeBox, ResultBox } from '../..';

export interface CatchMayFailBoxUseCase<ERROR, VALUE> {
  catch<NEW_VALUE>(fn: (e: ERROR) => NEW_VALUE): ResultBox<NEW_VALUE | VALUE>;
}

export interface CatchValueBoxUseCase<ERROR, VALUE> {
  catch<NEW_VALUE>(fn: (e: ERROR) => NEW_VALUE): MaybeBox<NEW_VALUE | VALUE>;
}
