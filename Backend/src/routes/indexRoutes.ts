import { Router } from 'express';
import { CopyVController } from '../controllers/CopyVController';
import { ErrorController } from '../controllers/ErrorController';

const fs = require('fs');
const path = require('path');
const parser = require('../util/grammar.js');

class IndexRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        this.router.get('/', (req, res) => {
            try {
                let route = path.resolve(__dirname, '../entrada.txt');
                let route2 = path.resolve(__dirname, '../entrada2.txt');
                let routeJSON = path.resolve(__dirname, '../ast.json');
                const mainFile = fs.readFileSync(route);
                const secondaryFile = fs.readFileSync(route2);

                const primaryAST = JSON.stringify(parser.parse(mainFile.toString()), null, 2);
                const secondaryAST = JSON.stringify(parser.parse(secondaryFile.toString()), null, 2);
                const primaryJSON = JSON.parse(primaryAST);
                const secondaryJSON = JSON.parse(secondaryAST);

                let errorController
                let primaryErrors;
                let secondaryErrors;

                let astReport;
                let copyClassReport;
                let copyFunctionReport;
                let copyVariableReport;

                if (primaryJSON.hasOwnProperty('error')
                    || secondaryJSON.hasOwnProperty('error')) {
                    if (primaryJSON.hasOwnProperty('error')) {
                        errorController = new ErrorController(primaryJSON);
                        primaryErrors = errorController.getErrorList();
                        console.log('main file errors');
                    }

                    if (secondaryJSON.hasOwnProperty('error')) {
                        errorController = new ErrorController(primaryJSON);
                        secondaryErrors = errorController.getErrorList();
                        console.log('secondary file errors');
                    }
                } else if (primaryJSON.hasOwnProperty('class')
                    && secondaryJSON.hasOwnProperty('class')) {
                    let cp = new CopyVController(primaryAST, secondaryAST);

                    astReport = cp.getASTDATA();
                    copyClassReport = cp.getCopyClassData();
                    copyFunctionReport = cp.getCopyMethods();
                    copyVariableReport = cp.getCopyMVariables();
                } else {
                    console.log('error parsing');
                }

                fs.writeFileSync(routeJSON, primaryAST);
                res.sendFile(routeJSON);
            } catch (e) {
                console.error(e);
                return;
            }
        });
    }
};

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
