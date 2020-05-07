import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class Condition extends Node {
    private expression: Node;

    constructor(expression: Node, line: number, column: number) {
        super(Type.condition, line, column);
        this.expression = expression;
    }
}
