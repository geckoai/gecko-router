import {injectable, ViewModel} from '@geckoai/gecko-core';
import { Subject } from 'rxjs';
import { useEffect, useState } from 'react';

@injectable()
export class LazyService {
  public vm = ViewModel.for(Date.now())
}