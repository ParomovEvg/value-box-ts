import { MapMayFailBoxUseCase } from '../useCases/MapUseCase';
import { CatchMayFailBoxUseCase } from '../useCases/CatchUseCase';
import { ChainMayFailUseCase } from '../useCases/ChainUseCase';

export interface MayFailBox<ERROR, VALUE>
  extends MapMayFailBoxUseCase<ERROR, VALUE>,
    CatchMayFailBoxUseCase<ERROR, VALUE>,
    ChainMayFailUseCase<ERROR, VALUE> {}
