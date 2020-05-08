import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class Declaration extends Node {
    private identifier: Array<Object>;
    private value: Node;
    private ty: Node;

    constructor(type: Node, identifier: Array<Object>, value: Node, line: number, column: number) {
        super(Type.declaration, line, column);
        this.identifier = identifier;
        this.value = value;
        this.ty = type;
    }
}
