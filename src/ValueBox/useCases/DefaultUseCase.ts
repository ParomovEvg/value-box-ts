import { MayFailBox, ResultBox } from '../..';

export interface DefaultMaybeBoxUseCase<VALUE> {
  default<NEW_VALUE>(defaultValue: NEW_VALUE): ResultBox<NEW_VALUE | VALUE>;
}
export interface DefaultValueBoxUseCase<ERROR, VALUE> {
  default<NEW_VALUE>(
    defaultValue: NEW_VALUE
  ): MayFailBox<ERROR, NEW_VALUE | VALUE>;
}
