import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class IterationS extends Node {
    private assignment: Node;
    private expression: Node;
    private iterator: Node;

    constructor(assignment: Node, expression: Node, iterator: Node,
        line: number, column: number) {
        super(Type.iterationStatements, line, column);
        this.assignment = assignment;
        this.expression = expression;
        this.iterator = iterator;
    }
}
