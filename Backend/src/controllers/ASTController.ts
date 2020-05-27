export class ASTController {
    private ASTData: string;

    constructor(data: string) {
        this.ASTData = '';
        this.astReport(JSON.parse(data));
    }

    private astReport(jsonData: any): void {
        for (const i in jsonData) {
            if (Array.isArray(jsonData[i]) || typeof jsonData[i] === 'object') {
                this.ASTData += ('<ul><li class="jstree-open">' + i)
                this.astReport(jsonData[i]);
                this.ASTData += ('</li></ul>');
            } else {
                this.ASTData += ('<ul><li>' + i + ': ' + jsonData[i] + '</li></ul>');
            }
        }
    }

    public getASTDATA(): string {
        return this.ASTData;
    }
};
