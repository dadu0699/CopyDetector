import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class InvokeMethod extends Node {
    private identifier: Node;
    private params: Node;

    constructor(identifier: Node, params: Node, line: number, column: number) {
        super(Type.invokeMethod, line, column);
        this.identifier = identifier;
        this.params = params;
    }
}
