/**
 * MIT License
 *
 * Copyright (c) 2021 @geckoai/platform-react RanYunLong<549510622@qq.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { UnaryFunction, Subject} from 'rxjs';
import {Dispatch, SetStateAction, useEffect, useState} from "react";

export class ViewModel<T> extends Subject<T> {
  public constructor(public value: T) {
    super()
    this.asState = this.asState.bind(this);
    this.next = this.next.bind(this);
    this.next(value);
  }

  /**
   * Create a new ViewModel
   * @param value
   */
  public static for<T>(value: T) {
    return new ViewModel<T>(value)
  }

  /**
   * Update current `state`
   * @param value
   */
  public next(value: T) {
    this.value = value;
    super.next(value);
  }

  /**
   * Transform to react `state`
   */
  public asState(): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState(this.value)
    useEffect(() => {
      const subscribe = this.subscribe(setState);
      return () => subscribe.unsubscribe();
    }, [state, setState])

    return [state, (callback) => {
      if (typeof callback === 'function') {
        this.next((callback as any)(this.value));
      } else {
        this.next(callback);
      }
    }]
  }

  /**
   * Pipe to react `state`
   * @param op
   */
  public pipeAsState<B>(op: UnaryFunction<T, B>): B {
    const [state, setState] = useState(op(this.value))
    useEffect(() => {
      const subscribe = this.subscribe((v) => {
        setState(op(v));
      })
      return () => subscribe.unsubscribe();
    }, [state, setState])
    return state;
  }
}