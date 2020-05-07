import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class CaseS extends Node {
    private condition: Node;
    private sentencesList: Array<Node>;

    constructor(condition: Node, sentencesList: Array<Node>, line: number, column: number) {
        super(Type.if, line, column);
        this.condition = condition;
        this.sentencesList = sentencesList;
    }
}
