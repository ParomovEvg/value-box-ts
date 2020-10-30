import { MapMaybeBoxUseCase } from '../useCases/MapUseCase';
import { IsEmptyUseCase } from '../useCases/IsEmptyUseCase';
import { IsResultUseCase } from '../useCases/IsResultUseCase';
import { DefaultMaybeBoxUseCase } from '../useCases/DefaultUseCase';

export interface MaybeBox<VALUE>
  extends MapMaybeBoxUseCase<VALUE>,
    DefaultMaybeBoxUseCase<VALUE>,
    IsEmptyUseCase,
    IsResultUseCase {}
