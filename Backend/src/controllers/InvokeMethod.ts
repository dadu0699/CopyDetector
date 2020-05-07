import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class InvokeMethod extends Node {
    private identifier: Node;
    private params: Node;

    constructor(type: Type, identifier: Node, params: Node, line: number, column: number) {
        super(type, line, column);
        this.identifier = identifier;
        this.params = params;
    }
}
