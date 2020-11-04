import {MaybeBox, MayFailBox, ResultBox, ValueBox} from "../..";

export function isResultBox<VALUE>(v: MaybeBox<VALUE>): v is ResultBox<VALUE>;
export function isResultBox<VALUE>(
    v: MayFailBox<any, VALUE>
): v is ResultBox<VALUE>;
export function isResultBox<VALUE>(
    v: ValueBox<any, VALUE>
): v is ResultBox<VALUE>;
export function isResultBox(v: any) {
    return v instanceof ResultBox;
}
