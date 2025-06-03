import { injectable } from '@geckoai/gecko-core';
import { Subject } from 'rxjs';
import { useEffect, useState } from 'react';

@injectable()
export class LazyService {
  private current = Date.now();
  private _vm = new Subject<number>();

  constructor() {
    this._vm.next(this.current);
    this._vm.subscribe((v) => {
      this.current = v;
    })
  }

  public next() {
    this._vm.next(Date.now());
  }

  public asState(): [number, (value: number) => void] {
    const [state, setState] = useState(this.current);
    useEffect(() => {
      const subscribe = this._vm.subscribe(setState);
      return () => subscribe.unsubscribe();
    }, [state, setState]);

    return [state, (v) => this._vm.next(v)];
  }
}