import { ErrorBox, MayFailBox, ValueBox } from '../..';

export function isErrorBox<ERROR>(
  v: MayFailBox<ERROR, any>
): v is ErrorBox<ERROR>;
export function isErrorBox<ERROR>(
  v: ValueBox<ERROR, any>
): v is ErrorBox<ERROR>;
export function isErrorBox(v: any) {
  return v instanceof ErrorBox;
}
