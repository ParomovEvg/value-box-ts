import { ValueMapUseCase } from './useCases/MapUseCase';
import { IsResultUseCase } from './useCases/IsResultUseCase';
import { IsEmptyUseCase } from './useCases/IsEmptyUseCase';
import { IsErrorUseCase } from './useCases/IsErrorUseCase';
import { ValueCatchUseCase } from './useCases/CatchUseCase';

export interface ValueBox<ERROR, VALUE>
  extends ValueMapUseCase<ERROR, VALUE>,
    ValueCatchUseCase<ERROR, VALUE>,
    IsResultUseCase,
    IsEmptyUseCase,
    IsErrorUseCase {}
