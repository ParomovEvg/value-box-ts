import {ValueBox} from "../ValueBox";

export interface DefaultUseCase<ERROR, VALUE> {
    default<NEW_VALUE>(fn: () => NEW_VALUE): ValueBox<ERROR, NEW_VALUE | VALUE>;
}