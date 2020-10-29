import { MayFailMapUseCase } from './useCases/MapUseCase';
import { IsResultUseCase } from './useCases/IsResultUseCase';
import { IsErrorUseCase } from './useCases/IsErrorUseCase';
import { MayFailCatchUseCase } from './useCases/CatchUseCase';

export interface MayFailBox<ERROR, VALUE>
  extends MayFailMapUseCase<ERROR, VALUE>,
    MayFailCatchUseCase<ERROR, VALUE>,
    IsResultUseCase,
    IsErrorUseCase {}
