import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class MethodS extends Node {
    private ty: Node;
    private identifier: Object;
    private params: Array<Node>;
    private sentencesList: Array<Node>;

    constructor(type: Node, identifier: Object, params: Array<Node>, sentencesList: Array<Node>,
        line: number, column: number) {
        super(Type.method, line, column);
        this.ty = type;
        this.identifier = identifier;
        this.params = params;
        this.sentencesList = sentencesList;
    }
}
