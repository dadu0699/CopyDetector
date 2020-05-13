import { ClassSController } from "./ClassSContoller";
import { ClassS } from "../models/ClassS";
import { MethodS } from "../models/MethodS";

export class CopyVController {
    private principal: ClassS;
    private secondary: ClassS;
    private ASTData: string;

    constructor(data1: string, data2: string) {
        this.principal = new ClassSController(data1).getData();
        this.secondary = new ClassSController(data2).getData();
        this.ASTData = '';

        this.copyClassReport();
        this.copyFunctionReport();
        this.copyVariableReport();
        this.astReport(JSON.parse(data1));
    }

    public getASTDATA(): string {
        return this.ASTData;
    }

    public copyClassReport(): void {
        let isCopyClass = false;

        if ((this.principal.getName() === this.secondary.getName())
            && this.principal.getMethods().length === this.secondary.getMethods().length) {
            this.principal.getMethods().forEach(element => {
                for (let i = 0; i < this.secondary.getMethods().length; i++) {
                    if (element.getName() === this.secondary.getMethods()[i].getName()
                        && element.getType() === this.secondary.getMethods()[i].getType()) {
                        isCopyClass = true;
                        break;
                    }

                    if (i === (this.secondary.getMethods().length - 1)
                        && (element.getName() !== this.secondary.getMethods()[i].getName())) {
                        isCopyClass = false;
                    }
                }

                if (!isCopyClass) {
                    return;
                }
            });
        }

        if (isCopyClass) {
            let methodsname: any = [];
            this.principal.getMethods().forEach(element => {
                methodsname.push({ 'method name': element.getName() });
            });
            let copyClassData = {
                'class name': this.principal.getName(),
                'methods': methodsname,
                'number of methods': this.principal.getMethods().length
            }

            console.log('It\'s a copy of the class');
            console.log(JSON.stringify(copyClassData, null, 2));
        } else {
            console.log('Not a copy of the class');
        }
    }

    public copyFunctionReport(): void {
        let methods: Array<MethodS> = [];
        let isCopyMethod = false;

        if (this.principal.getName() === this.secondary.getName()) {
            this.principal.getMethods().forEach(element => {
                for (let i = 0; i < this.secondary.getMethods().length; i++) {
                    if (element.getParams().length === this.secondary.getMethods()[i].getParams().length) {
                        let parameterLength = element.getParams().length;
                        if (parameterLength == 0) {
                            isCopyMethod = true;
                        } else {
                            for (let j = 0; j < parameterLength; j++) {
                                if (element.getParams()[j].getType() === this.secondary.getMethods()[i].getParams()[j].getType()) {
                                    isCopyMethod = true;
                                } else {
                                    isCopyMethod = false;
                                    break;
                                }
                            }
                        }
                    }

                    if (isCopyMethod && element.getType() == this.secondary.getMethods()[i].getType()) {
                        if (!methods.includes(this.secondary.getMethods()[i])) {
                            methods.push(this.secondary.getMethods()[i]);
                        }
                    }

                    isCopyMethod = false;
                }
            });
        }

        let methodsData: any = [];
        methods.forEach(element => {
            methodsData.push({
                'type of method': element.getType(),
                'method name': element.getName(),
                'parameters': element.getParams()
            });
        });
        let copyMethods = {
            'class name': this.secondary.getName(),
            'copy methods': methodsData
        }

        console.log('Copy methods:');
        console.log(JSON.stringify(copyMethods, null, 2));
    }

    public copyVariableReport(): void {
        let methods: Array<MethodS> = [];

        if (this.principal.getName() === this.secondary.getName()) {
            this.principal.getMethods().forEach(element => {
                let method: MethodS = new MethodS();
                method.setName(element.getName());
                for (let i = 0; i < this.secondary.getMethods().length; i++) {
                    if (element.getType() === this.secondary.getMethods()[i].getType()
                        && element.getName() === this.secondary.getMethods()[i].getName()) {
                        element.getVariables().forEach(variable => {
                            for (let j = 0; j < this.secondary.getMethods()[i].getVariables().length; j++) {
                                if (variable.getName() === this.secondary.getMethods()[i].getVariables()[j].getName()
                                    && variable.getType() === this.secondary.getMethods()[i].getVariables()[j].getType()) {
                                    method.getVariables().push(variable);
                                }
                            }
                        });
                    }
                }

                if (method.getVariables().length > 0) {
                    methods.push(method);
                }
            });
        }

        let methodsData: any = [];
        methods.forEach(element => {
            methodsData.push({
                'method name': element.getName(),
                'variables': element.getVariables()
            });
        });
        let copyMethods = {
            'class name': this.secondary.getName(),
            'methods': methodsData
        }

        console.log('Copy variables:');
        console.log(JSON.stringify(copyMethods, null, 2));
    }


    private astReport(jsonData: any): void {
        for (const i in jsonData) {
            if (Array.isArray(jsonData[i]) || typeof jsonData[i] === 'object') {
                this.ASTData += ('<ul><li>' + i)
                this.astReport(jsonData[i]);
                this.ASTData += ('</li></ul>');
            } else {
                this.ASTData += ('<ul><li>' + i + ': ' + jsonData[i] + '</li></ul>');
            }
        }
    }
};