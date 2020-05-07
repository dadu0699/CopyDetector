import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class Declaration extends Node {
    private identifier: Object;
    private value: Node;

    constructor(type: Type, identifier: Object, value: Node, line: number, column: number) {
        super(type, line, column);
        this.identifier = identifier;
        this.value = value;
    }
}
