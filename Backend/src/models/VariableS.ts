export class VariableS {
    private type: string;
    private name: string;

    constructor(type: string, name: string, ) {
        this.type = type;
        this.name = name;
    }

    public get Type(): string {
        return this.type;
    }

    public set Type(type: string) {
        this.type = type;
    }

    public get Name(): string {
        return this.name;
    }

    public set Name(name: string) {
        this.name = name;
    }
};
