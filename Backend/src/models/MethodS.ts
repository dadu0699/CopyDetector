import { ParamS } from './ParamS';
import { VariableS } from "./VariableS";

export class MethodS {
    private type: string;
    private name: string;
    private params: Array<ParamS>;
    private variables: Array<VariableS>;

    constructor() {
        this.type = '';
        this.name = '';
        this.params = [];
        this.variables = [];
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

    public getParams(): Array<ParamS> {
        return this.params;
    }

    public setParams(params: Array<ParamS>) {
        this.params = params;
    }

    public getVariables(): Array<VariableS> {
        return this.variables;
    }

    public setVariabes(variables: Array<VariableS>) {
        this.variables = variables;
    }
};
