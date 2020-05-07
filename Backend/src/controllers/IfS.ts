import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class IfS extends Node {
    private condition: Node;
    private sentencesList: Array<Node>;
    private elseList: Array<Node>;

    constructor(condition: Node, sentencesList: Array<Node>, elseList: Array<Node>,
        line: number, column: number) {
        super(Type.if, line, column);
        this.condition = condition;
        this.sentencesList = sentencesList;
        this.elseList = elseList;
    }
}
