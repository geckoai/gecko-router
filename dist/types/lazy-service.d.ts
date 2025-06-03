export declare class LazyService {
    private current;
    private _vm;
    constructor();
    next(): void;
    asState(): [number, (value: number) => void];
}
