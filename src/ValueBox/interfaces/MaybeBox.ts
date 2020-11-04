import { MapMaybeBoxUseCase } from '../useCases/MapUseCase';
import { DefaultMaybeBoxUseCase } from '../useCases/DefaultUseCase';
import { ChainMaybeUseCase } from '../useCases/ChainUseCase';

export interface MaybeBox<VALUE>
  extends MapMaybeBoxUseCase<VALUE>,
    DefaultMaybeBoxUseCase<VALUE>,
    ChainMaybeUseCase<VALUE> {}
