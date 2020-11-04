import { MapValueBoxUseCase } from '../useCases/MapUseCase';
import { CatchValueBoxUseCase } from '../useCases/CatchUseCase';
import { DefaultValueBoxUseCase } from '../useCases/DefaultUseCase';
import { ChainValueBoxUseCase } from '../useCases/ChainUseCase';

export interface ValueBox<ERROR, VALUE>
  extends MapValueBoxUseCase<ERROR, VALUE>,
    CatchValueBoxUseCase<ERROR, VALUE>,
    DefaultValueBoxUseCase<ERROR, VALUE>,
    ChainValueBoxUseCase<ERROR, VALUE> {}
