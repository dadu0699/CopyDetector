import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class Print extends Node {
    private value: Node;

    constructor(type: Type, value: Node, line: number, column: number) {
        super(type, line, column);
        this.value = value;
    }
}
