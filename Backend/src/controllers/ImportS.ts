import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class ImportS extends Node {
    private value: Object;

    constructor(value: Object, line: number, column: number) {
        super(Type.import, line, column);
        this.value = value;
    }
}
