import { MethodS } from './MethodS';

export class ClassS {
    private name: string;
    private methods: Array<MethodS>;

    constructor() {
        this.name = '';
        this.methods = [];
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getMethods(): Array<MethodS> {
        return this.methods;
    }

    public setMethods(methods: Array<MethodS>) {
        this.methods = methods;
    }
};
