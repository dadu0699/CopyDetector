import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class DoWhile extends Node {
    private condition: Node;
    private sentencesList: Array<Node>;

    constructor(sentencesList: Array<Node>, condition: Node, line: number, column: number) {
        super(Type.do, line, column);
        this.condition = condition;
        this.sentencesList = sentencesList;
    }
}
