import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class BreakS extends Node {
    constructor(line: number, column: number) {
        super(Type.break, line, column);
    }
}
