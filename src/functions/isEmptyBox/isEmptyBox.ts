import { EmptyBox, MaybeBox, ValueBox } from '../..';

export function isEmptyBox(v: MaybeBox<any>): v is EmptyBox;
export function isEmptyBox(v: ValueBox<any, any>): v is EmptyBox;
export function isEmptyBox(v: any) {
  return v instanceof EmptyBox;
}
