import { Type } from './Type';
import { ParamS } from './ParamS';

export class MethodS {
    private name: string;
    private type: Type;
    private params: Array<ParamS>;
    private returnS: string;

    constructor(name: string, type: Type, params: Array<ParamS>, returnS: string) {
        this.name = name;
        this.type = type;
        this.params = params;
        this.returnS = returnS;
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

    public get Params(): Array<ParamS> {
        return this.params;
    }

    public set Params(params: Array<ParamS>) {
        this.params = params;
    }

    public get ReturnS(): string {
        return this.returnS;
    }

    public set ReturnS(returnS: string) {
        this.returnS = returnS;
    }
};
