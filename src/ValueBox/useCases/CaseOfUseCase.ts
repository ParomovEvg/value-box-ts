export interface CaseOfUseCase<ERROR, VALUE> {
    caseOf<RESULT, ERROR_RESULT, DEFAULT_RESULT>(obj: {
        result: (fn: VALUE) => RESULT;
        error: (fn: ERROR) => ERROR_RESULT;
        empty: () => DEFAULT_RESULT;
    }): RESULT | ERROR_RESULT | DEFAULT_RESULT;
}