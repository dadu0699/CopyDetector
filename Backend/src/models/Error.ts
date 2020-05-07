import { Type } from './Type';

export class Error {
    private idError: number;
    private row: number;
    private column: number;
    private character: string;
    private description: string;
    private type: Type;

    constructor(idError: number, row: number, column: number, character: string, description: string, type: Type) {
        this.idError = idError;
        this.row = row;
        this.column = column;
        this.character = character;
        this.description = description;
        this.type = type;
    }

    public getIDError(): number {
        return this.idError;
    }

    public getRow(): number {
        return this.row;
    }

    public getColumn(): number {
        return this.column;
    }

    public getCharacter(): string {
        return this.character;
    }

    public getDescription(): string {
        return this.description;
    }

    public getType(): Type {
        return this.type;
    }
};
