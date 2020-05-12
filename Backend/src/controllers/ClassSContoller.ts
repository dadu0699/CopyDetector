import { ClassS } from "../models/ClassS";
import { MethodS } from "../models/MethodS";
import { ParamS } from "../models/ParamS";
import { VariableS } from "../models/VariableS";

export class ClassSController {
    private classS: ClassS;
    private jsonData: any;
    private declarations: any;
    private identifiers: any;

    constructor(data: string) {
        this.classS = new ClassS();
        this.jsonData = JSON.parse(data);
        this.declarations = [];
        this.identifiers = [];

        this.buildClass();
        /*
            console.log(this.classS)
            this.classS.getMethods().forEach(s => {
                console.log(s);
            });
        */
    }

    public getData(): ClassS {
        return this.classS;
    }

    private buildClass(): void {
        this.classS.setName(this.jsonData['class']['class_name']);

        let classContent = this.jsonData['class']['class_content'];
        this.buildMehtods(classContent);
    }

    private buildMehtods(classContent: any): void {
        for (let index = 0; index < Object.keys(classContent).length; index++) {
            let methodS: MethodS = new MethodS();
            methodS.setName(this.getKey('method_name', classContent[index]));
            methodS.setType(this.getKey('type', classContent[index]));

            methodS.setParams(this.buildParams(this.getKey('method_params', classContent[index])));

            methodS.setVariabes(this.buildVariables(this.getKey('method_content', classContent[index])));

            this.classS.getMethods().push(methodS);
        }
    }

    private buildParams(param: any): Array<ParamS> {
        let paramsList: Array<ParamS> = [];

        for (let index = 0; index < Object.keys(param).length; index++) {
            let paramS: ParamS = new ParamS();
            paramS.setType(this.getKey('type', param[index]));
            paramS.setIdentifier(this.getKey('identifier', param[index]));

            paramsList.push(paramS);
        }
        return paramsList;
    }

    private buildVariables(methodContent: any): Array<VariableS> {
        let variablesList: Array<VariableS> = [];

        this.declarations = [];
        this.getDeclarations(methodContent);
        // console.log(this.declarations);

        this.identifiers = [];
        this.getIdentifiers(this.declarations);
        // console.log(this.identifiers);

        for (let index = 0; index < this.declarations.length; index++) {
            this.identifiers[index].forEach((element: any) => {
                variablesList.push(new VariableS(this.declarations[index].type, element.identifier))
            });
        }
        return variablesList;
    }

    private getDeclarations(methodContent: any): void {
        Object.keys(methodContent).forEach(key => {
            var value = methodContent[key];
            if (Array.isArray(value) || typeof value === 'object') {
                if (key == 'declaration') {
                    // console.log(key, value);
                    this.declarations.push(value);
                }
                this.getDeclarations(value);
            }
        });
    }

    private getIdentifiers(identifier: any): void {
        Object.keys(identifier).forEach(key => {
            var value = identifier[key];
            if (Array.isArray(value) || typeof value === 'object') {
                if (key == 'identifiers') {
                    this.identifiers = this.identifiers.concat([value]);
                }
                this.getIdentifiers(value);
            }
        });
    }

    private getKey(matchString: string, jsonObject: any): any {
        let expression: RegExp = new RegExp(matchString);

        for (var key in jsonObject) {
            if (jsonObject.hasOwnProperty(key)) {
                if (expression.test(key)) {
                    // console.log('match!', jsonObject[key]);
                    return jsonObject[key];
                }
            }
        }
    }

    private fillIn(data: string): void {
        let jsonData = JSON.parse(data);

        Object.keys(jsonData).forEach(key => {
            var value = jsonData[key];
            console.log(value);
        });
    }
};
