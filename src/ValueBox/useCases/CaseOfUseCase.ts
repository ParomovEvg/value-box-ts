export interface CaseOfValueBoxUseCase<ERROR, VALUE> {
  caseOf<RESULT, ERROR_RESULT, DEFAULT_RESULT>(obj: {
    result: (fn: VALUE) => RESULT;
    error: (fn: ERROR) => ERROR_RESULT;
    empty: () => DEFAULT_RESULT;
  }): RESULT | ERROR_RESULT | DEFAULT_RESULT;
}
export interface CaseOfMaybeBoxUseCase<VALUE> {
  caseOf<RESULT, DEFAULT_RESULT>(obj: {
    result: (fn: VALUE) => RESULT;
    empty: () => DEFAULT_RESULT;
  }): RESULT | DEFAULT_RESULT;
}
export interface CaseOfMayFailUseCase<ERROR, VALUE> {
  caseOf<RESULT, ERROR_RESULT>(obj: {
    result: (fn: VALUE) => RESULT;
    error: (fn: ERROR) => ERROR_RESULT;
  }): RESULT | ERROR_RESULT;
}
