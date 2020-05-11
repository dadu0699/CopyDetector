import { Type } from "./Type";

export class ParamS {
    private name: string;
    private type: Type;

    constructor(name: string, type: Type) {
        this.name = name;
        this.type = type;
    }

    public get Name(): string {
        return this.name
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
};
