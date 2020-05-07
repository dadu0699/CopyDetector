import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class ForS extends Node {
    private iterationS: Node;
    private sentecesList: Array<Node>

    constructor(iterationS: Node, sentecesList: Array<Node>, line: number, column: number) {
        super(Type.for, line, column);
        this.iterationS = iterationS;
        this.sentecesList = sentecesList;
    }
}
