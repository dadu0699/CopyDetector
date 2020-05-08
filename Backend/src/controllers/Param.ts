import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class Param extends Node {
    private ty: Node;
    private value: Object;

    constructor(condition: Node, value: Object, line: number, column: number) {
        super(Type.param, line, column);
        this.ty = condition;
        this.value = value;
    }
}
