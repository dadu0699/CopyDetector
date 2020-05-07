import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class Primitive extends Node {
    private value: Object;

    constructor(type: Type, value: Object, line: number, column: number) {
        super(type, line, column);
        this.value = value;
    }
}
