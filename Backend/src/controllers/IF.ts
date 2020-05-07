import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class IF extends Node {
    private condition: Node;
    private sentenceslist: Array<Node>;
    private elseList: Array<Node>;

    constructor(type: Type, condition: Node, sentenceslist: Array<Node>, elseList: Array<Node>,
        value: Node, line: number, column: number) {
        super(type, line, column);
        this.condition = condition;
        this.sentenceslist = sentenceslist;
        this.elseList = elseList;
    }
}
