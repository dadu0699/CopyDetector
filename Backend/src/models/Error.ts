export class Error {
    private idError: number;
    private row: number;
    private column: number;
    private description: string;
    private type: string;

    constructor(idError: number, type: string, row: number, column: number, description: string) {
        this.idError = idError;
        this.row = row;
        this.column = column;
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

    public getDescription(): string {
        return this.description;
    }

    public getType(): string {
        return this.type;
    }
};
