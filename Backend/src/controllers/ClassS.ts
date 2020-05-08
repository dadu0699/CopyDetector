import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class ClassS extends Node {
    private identifier: Object;
    private value: Node;

    constructor(identifier: Object, value: Node, line: number, column: number) {
        super(Type.class, line, column);
        this.identifier = identifier;
        this.value = value;
    }
}
