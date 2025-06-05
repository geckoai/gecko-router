import {injectable, ViewModel} from '@geckoai/gecko-core';

@injectable("Singleton")
export class LazyService {
  public vm = ViewModel.for(Date.now())
}