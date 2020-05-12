export class VariableS {
    private type: string;
    private name: string;

    constructor(type: string, name: string, ) {
        this.type = type;
        this.name = name;
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string) {
        this.type = type;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }
};
