import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class SwitchS extends Node {
    private condition: Node;
    private caseList: Array<Node>;
    private defaultL: Node;

    constructor(condition: Node, caseList: Array<Node>, defaultL: Node,
        line: number, column: number) {
        super(Type.switch, line, column);
        this.condition = condition;
        this.caseList = caseList;
        this.defaultL = defaultL;
    }
}
