import { ClassSController } from "./ClassSContoller";

export class CopyVController {
    private principal: ClassSController;
    private secondary: ClassSController;

    constructor(data1: string, data2: string) {
        this.principal = new ClassSController(data1);
        this.secondary = new ClassSController(data2);

        this.copyClassReport();
    }

    public copyClassReport(): void {
        let principal = this.principal.getData();
        let secondary = this.secondary.getData();
        let copyClass = false;

        if ((principal.getName() !== secondary.getName())
            || principal.getMethods().length !== secondary.getMethods().length) {
            copyClass = true;
        }

        principal.getMethods().forEach(element => {
            for (let index = 0; index < secondary.getMethods().length; index++) {
                if (element.getName() === secondary.getMethods()[index].getName()) {
                    copyClass = true;
                    break;
                }

                if (index === (secondary.getMethods().length - 1)
                    && (element.getName() !== secondary.getMethods()[index].getName())) {
                    copyClass = false;
                }
            }

            if (copyClass) {
                return;
            }
        });

        if (copyClass) {
            let methodsname: any = [];
            principal.getMethods().forEach(element => {
                methodsname.push({ 'method name': element.getName() });
            });
            let copyClassData = {
                'class name': principal.getName(),
                'methods': methodsname,
                'number of methods': principal.getMethods().length
            }

            console.log('It\'s a copy of the class');
            console.log(JSON.stringify(copyClassData, null, 2));
        } else {
            console.log('Not a copy of the class');
        }
    }

    public copyFunctionReport(): void {

    }
};
