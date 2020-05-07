import { Type } from './Type'

export class Node {
    private line: number;
    private column: number;
    private type: Type;

    constructor(type: Type, line: number, column: number) {
        this.type = type;
        this.line = line;
        this.column = column;
    }

    public getLine(): number {
        return this.line;
    }

    public setLine(line: number): void {
        this.line = line;
    }

    public getColumn(): number {
        return this.column;
    }

    public setColumn(column: number): void {
        this.column = column;
    }

    public getType(): Type {
        return this.type;
    }

    public setType(type: Type): void {
        this.type = type;
    }
}
