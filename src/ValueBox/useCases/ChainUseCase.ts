import {ValueBox} from "../interfaces/ValueBox";

export interface ChainUseCase<ERROR, VALUE> {
    chain<NEW_ERROR, NEW_VALUE>(
        fn: (v: VALUE) => ValueBox<NEW_ERROR, NEW_VALUE>
    ): ValueBox<NEW_ERROR | ERROR, NEW_VALUE>;
}