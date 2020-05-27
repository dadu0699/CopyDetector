import { ClassSController } from './ClassSContoller';
import { ClassS } from '../models/ClassS';
import { MethodS } from '../models/MethodS';

export class CopyVController {
    private principal: ClassS;
    private secondary: ClassS;

    private copyClassData: any;
    private copyMethods: any;
    private copyMVariables: any;

    constructor(data1: string, data2: string) {
        this.principal = new ClassSController(data1).getData();
        this.secondary = new ClassSController(data2).getData();
        this.copyClassData = {};
        this.copyMethods = {};
        this.copyMVariables = {};

        this.copyClassReport();
        this.copyFunctionReport();
        this.copyVariableReport();
    }

    private copyClassReport(): void {
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
            this.copyClassData = {
                'class name': this.principal.getName(),
                'methods': methodsname,
                'number of methods': this.principal.getMethods().length
            }

            // console.log('It\'s a copy of the class');
            // console.log(JSON.stringify(this.copyClassData, null, 2));
        }
    }

    private copyFunctionReport(): void {
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

            if (methods.length > 0) {
                let methodsData: any = [];
                methods.forEach(element => {
                    methodsData.push({
                        'type of method': element.getType(),
                        'method name': element.getName(),
                        'parameters': element.getParams()
                    });
                });
                this.copyMethods = {
                    'class name': this.secondary.getName(),
                    'copy methods': methodsData
                }
                // console.log('Copy methods:');
                // console.log(JSON.stringify(this.copyMethods, null, 2));
            }
        }
    }

    private copyVariableReport(): void {
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

            if (methods.length > 0) {
                let methodsData: any = [];
                methods.forEach(element => {
                    methodsData.push({
                        'method name': element.getName(),
                        'variables': element.getVariables()
                    });
                });
                this.copyMVariables = {
                    'class name': this.secondary.getName(),
                    'methods': methodsData
                }
                // console.log('Copy variables:');
                // console.log(JSON.stringify(this.copyMVariables, null, 2));
            }
        }
    }

    public getCopyClassData(): any {
        return JSON.stringify(this.copyClassData, null, 2);
    }

    public getCopyMethods(): any {
        return JSON.stringify(this.copyMethods, null, 2);
    }

    public getCopyMVariables(): any {
        return JSON.stringify(this.copyMVariables, null, 2);
    }
};
