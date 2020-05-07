import { Node } from '../models/Node';
import { Type } from '../models/Type';

export class ContinueS extends Node {
    constructor(line: number, column: number) {
        super(Type.continue, line, column);
    }
}
