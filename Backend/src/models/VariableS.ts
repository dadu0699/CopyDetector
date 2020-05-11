import { Type } from "./Type";

export class VariableS {
    private name: string;
    private type: Type;
    private value: string;

    constructor(name: string, type: Type, value: string) {
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

    public get Type(): Type {
        return this.type;
    }

    public set Type(type: Type) {
        this.type = type;
    }

    public get Value(): string {
        return this.value;
    }
    public set Value(value: string) {
        this.value = value;
    }
};
