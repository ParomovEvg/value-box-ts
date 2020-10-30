import { MapMayFailBoxUseCase } from '../useCases/MapUseCase';
import { IsResultUseCase } from '../useCases/IsResultUseCase';
import { IsErrorUseCase } from '../useCases/IsErrorUseCase';
import { CatchMayFailBoxUseCase } from '../useCases/CatchUseCase';

export interface MayFailBox<ERROR, VALUE>
  extends MapMayFailBoxUseCase<ERROR, VALUE>,
    CatchMayFailBoxUseCase<ERROR, VALUE>,
    IsResultUseCase,
    IsErrorUseCase {}
