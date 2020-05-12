import { ClassSController } from "./ClassSContoller";
import { ClassS } from "../models/ClassS";
import { MethodS } from "../models/MethodS";

export class CopyVController {
    private principal: ClassS;
    private secondary: ClassS;

    constructor(data1: string, data2: string) {
        this.principal = new ClassSController(data1).getData();
        this.secondary = new ClassSController(data2).getData();

        this.copyClassReport();
        console.log('\n------------------------------------------------------------------------\n')
        this.copyFunctionReport();
    }

    public copyClassReport(): void {
        let isCopyClass = false;

        if ((this.principal.getName() === this.secondary.getName())
            && this.principal.getMethods().length === this.secondary.getMethods().length) {
            this.principal.getMethods().forEach(element => {
                for (let i = 0; i < this.secondary.getMethods().length; i++) {
                    if (element.getName() === this.secondary.getMethods()[i].getName()) {
                        isCopyClass = true;
                        break;
                    }

                    if (i === (this.secondary.getMethods().length - 1)
                        && (element.getName() !== this.secondary.getMethods()[i].getName())) {
                        isCopyClass = false;
                    }
                }

                if (isCopyClass) {
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
};
