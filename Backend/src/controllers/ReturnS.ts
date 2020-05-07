import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class ReturnS extends Node {
    private value: Object;

    constructor(value: Object, line: number, column: number) {
        super(Type.return, line, column);
        this.value = value;
    }
}
