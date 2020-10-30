import { MapValueBoxUseCase } from '../useCases/MapUseCase';
import { IsResultUseCase } from '../useCases/IsResultUseCase';
import { IsEmptyUseCase } from '../useCases/IsEmptyUseCase';
import { IsErrorUseCase } from '../useCases/IsErrorUseCase';
import { CatchValueBoxUseCase } from '../useCases/CatchUseCase';
import { DefaultValueBoxUseCase } from '../useCases/DefaultUseCase';

export interface ValueBox<ERROR, VALUE>
  extends MapValueBoxUseCase<ERROR, VALUE>,
    CatchValueBoxUseCase<ERROR, VALUE>,
    DefaultValueBoxUseCase<ERROR, VALUE>,
    IsResultUseCase,
    IsEmptyUseCase,
    IsErrorUseCase {}
