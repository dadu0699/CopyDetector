export class ParamS {
    private type: string;
    private identifier: string;

    constructor() {
        this.type = '';
        this.identifier = '';
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string) {
        this.type = type;
    }

    public getIdentifier(): string {
        return this.identifier
    }

    public setIdentifier(name: string) {
        this.identifier = name;
    }
};
