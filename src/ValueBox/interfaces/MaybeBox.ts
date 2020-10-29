import { MaybeMapUseCase } from './useCases/MapUseCase';
import { IsEmptyUseCase } from './useCases/IsEmptyUseCase';
import { IsResultUseCase } from './useCases/IsResultUseCase';

export interface MaybeBox<VALUE>
  extends MaybeMapUseCase<VALUE>,
    IsEmptyUseCase,
    IsResultUseCase {}
