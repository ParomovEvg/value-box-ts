import { ResultBox, ValueBox } from '..';

function mergeInOne<L1, R1>(values: [ValueBox<L1, R1>]): ValueBox<L1, [R1]>;
function mergeInOne<L1, R1, L2, R2>(
  values: [ValueBox<L1, R1>, ValueBox<L2, R2>]
): ValueBox<L1 | L2, [R1, R2]>;
function mergeInOne<L1, R1, L2, R2, L3, R3>(
  values: [ValueBox<L1, R1>, ValueBox<L2, R2>, ValueBox<L3, R3>]
): ValueBox<L1 | L2 | L3, [R1, R2, R3]>;
function mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4>(
  values: [
    ValueBox<L1, R1>,
    ValueBox<L2, R2>,
    ValueBox<L3, R3>,
    ValueBox<L4, R4>
  ]
): ValueBox<L1 | L2 | L3 | L4, [R1, R2, R3, R4]>;
function mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5>(
  values: [
    ValueBox<L1, R1>,
    ValueBox<L2, R2>,
    ValueBox<L3, R3>,
    ValueBox<L4, R4>,
    ValueBox<L5, R5>
  ]
): ValueBox<L1 | L2 | L3 | L4 | L5, [R1, R2, R3, R4, R5]>;
function mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5, L6, R6>(
  values: [
    ValueBox<L1, R1>,
    ValueBox<L2, R2>,
    ValueBox<L3, R3>,
    ValueBox<L4, R4>,
    ValueBox<L5, R5>,
    ValueBox<L6, R6>
  ]
): ValueBox<L1 | L2 | L3 | L4 | L5 | L6, [R1, R2, R3, R4, R5, R6]>;
function mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5, L6, R6, L7, R7>(
  values: [
    ValueBox<L1, R1>,
    ValueBox<L2, R2>,
    ValueBox<L3, R3>,
    ValueBox<L4, R4>,
    ValueBox<L5, R5>,
    ValueBox<L6, R6>,
    ValueBox<L7, R7>
  ]
): ValueBox<L1 | L2 | L3 | L4 | L5 | L6 | L7, [R1, R2, R3, R4, R5, R6, R7]>;
function mergeInOne<
  L1,
  R1,
  L2,
  R2,
  L3,
  R3,
  L4,
  R4,
  L5,
  R5,
  L6,
  R6,
  L7,
  R7,
  L8,
  R8
>(
  values: [
    ValueBox<L1, R1>,
    ValueBox<L2, R2>,
    ValueBox<L3, R3>,
    ValueBox<L4, R4>,
    ValueBox<L5, R5>,
    ValueBox<L6, R6>,
    ValueBox<L7, R7>,
    ValueBox<L8, R8>
  ]
): ValueBox<
  L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8,
  [R1, R2, R3, R4, R5, R6, R7, R8]
>;
function mergeInOne<
  L1,
  R1,
  L2,
  R2,
  L3,
  R3,
  L4,
  R4,
  L5,
  R5,
  L6,
  R6,
  L7,
  R7,
  L8,
  R8,
  L9,
  R9
>(
  values: [
    ValueBox<L1, R1>,
    ValueBox<L2, R2>,
    ValueBox<L3, R3>,
    ValueBox<L4, R4>,
    ValueBox<L5, R5>,
    ValueBox<L6, R6>,
    ValueBox<L7, R7>,
    ValueBox<L8, R8>,
    ValueBox<L9, R9>
  ]
): ValueBox<
  L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9,
  [R1, R2, R3, R4, R5, R6, R7, R8, R9]
>;
function mergeInOne<
  L1,
  R1,
  L2,
  R2,
  L3,
  R3,
  L4,
  R4,
  L5,
  R5,
  L6,
  R6,
  L7,
  R7,
  L8,
  R8,
  L9,
  R9,
  L10,
  R10
>(
  values: [
    ValueBox<L1, R1>,
    ValueBox<L2, R2>,
    ValueBox<L3, R3>,
    ValueBox<L4, R4>,
    ValueBox<L5, R5>,
    ValueBox<L6, R6>,
    ValueBox<L7, R7>,
    ValueBox<L8, R8>,
    ValueBox<L9, R9>,
    ValueBox<L10, R10>
  ]
): ValueBox<
  L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 | L10,
  [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]
>;
function mergeInOne<L, R>(either: Array<ValueBox<L, R>>): ValueBox<L, R[]>;
function mergeInOne(boxes: Array<ValueBox<unknown, unknown>>) {
  return boxes.reduce(
    (res: ValueBox<unknown, Array<unknown>>, v) =>
      v.chain(v => res.map(res => res.concat([v]))),
    ResultBox.of([])
  );
}

export const merge = mergeInOne;
