import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class WhileS extends Node {
    private condition: Node;
    private sentencesList: Array<Node>;

    constructor(condition: Node, sentencesList: Array<Node>, line: number, column: number) {
        super(Type.while, line, column);
        this.condition = condition;
        this.sentencesList = sentencesList;
    }
}
