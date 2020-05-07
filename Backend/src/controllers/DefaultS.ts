import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class DefaultS extends Node {
    private sentencesList: Array<Node>;

    constructor(sentencesList: Array<Node>, line: number, column: number) {
        super(Type.default, line, column);
        this.sentencesList = sentencesList;
    }
}
