export interface OrDefaultUseCase<VALUE> {
    orDefault<DEFAULT_VALUE>(d: DEFAULT_VALUE): VALUE | DEFAULT_VALUE;
}