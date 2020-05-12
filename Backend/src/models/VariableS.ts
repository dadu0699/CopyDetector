export class VariableS {
    private name: string;
    private type: string;
    private value: string;

    constructor(name: string, type: string, value: string) {
        this.name = name;
        this.type = type;
        this.value = value;
    }

    public get Name(): string {
        return this.name;
    }

    public set Name(name: string) {
        this.name = name;
    }

    public get Type(): string {
        return this.type;
    }

    public set Type(type: string) {
        this.type = type;
    }

    public get Value(): string {
        return this.value;
    }
    public set Value(value: string) {
        this.value = value;
    }
};
