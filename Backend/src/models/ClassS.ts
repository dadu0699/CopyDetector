import { MethodS } from "./MethodS";
import { VariableS } from "./VariableS";

export class ClassS {
    private name: string;
    private methods: Array<MethodS>;
    private variables: Array<VariableS>;

    constructor(name: string, methods: Array<MethodS>, variables: Array<VariableS>) {
        this.name = name;
        this.methods = methods;
        this.variables = variables;
    }

    public get Name(): string {
        return this.name;
    }

    public set Name(name: string) {
        this.name = name;
    }

    public get Methods(): Array<MethodS> {
        return this.methods;
    }

    public set Methods(methods: Array<MethodS>) {
        this.methods = methods;
    }

    public get Variables(): Array<VariableS> {
        return this.variables;
    }

    public set Variabes(variables: Array<VariableS>) {
        this.variables = variables;
    }
};
