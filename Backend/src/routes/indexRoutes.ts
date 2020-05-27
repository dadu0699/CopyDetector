import { Router } from 'express';
import { CopyVController } from '../controllers/CopyVController';
import { ErrorController } from '../controllers/ErrorController';
import { ASTController } from '../controllers/ASTController';

const parser = require('../util/grammar.js');

class IndexRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        this.router.get('/', (req, res) => {
            res.send('Copy Detector');
        });

        this.router.post('/', (req, res) => {
            let data = req.body;

            try {
                const primaryAST = JSON.stringify(parser.parse(data['mainFile']), null, 2);
                const secondaryAST = JSON.stringify(parser.parse(data['secondaryFile']), null, 2);
                const primaryJSON = JSON.parse(primaryAST);
                const secondaryJSON = JSON.parse(secondaryAST);

                let errorController
                let primaryErrors;
                let secondaryErrors;

                let copyClassReport: Array<any> = [];
                let copyFunctionReport: Array<any> = [];
                let copyVariableReport: Array<any> = [];

                if (primaryJSON.hasOwnProperty('error')
                    || secondaryJSON.hasOwnProperty('error')) {
                    if (primaryJSON.hasOwnProperty('error')) {
                        console.log('main file errors');
                        errorController = new ErrorController(primaryJSON);
                        primaryErrors = errorController.getErrorList();
                    }

                    if (secondaryJSON.hasOwnProperty('error')) {
                        console.log('secondary file errors');
                        errorController = new ErrorController(secondaryJSON);
                        secondaryErrors = errorController.getErrorList();
                    }

                    let results = {
                        'primaryErrors': primaryErrors,
                        'secondaryErrors': secondaryErrors
                    }
                    res.status(200).send({
                        code: '200',
                        errors: results
                    });
                } else if (primaryJSON.hasOwnProperty('classes')
                    && secondaryJSON.hasOwnProperty('classes')) {
                    let astReport = new ASTController(primaryAST);
                    let ast2Report = new ASTController(secondaryAST);

                    Object.entries(primaryJSON['classes']).forEach((ar1: any) => {
                        Object.entries(secondaryJSON['classes']).forEach((ar2: any) => {
                            let primary = JSON.stringify(ar1[1], null, 2);
                            let secondary = JSON.stringify(ar2[1], null, 2);

                            let cp = new CopyVController(primary, secondary);

                            if (Object.keys(cp.getCopyClassData()).length !== 0) {
                                copyClassReport.push(cp.getCopyClassData());
                            }

                            if (Object.keys(cp.getCopyMethods()).length !== 0) {
                                copyFunctionReport.push(cp.getCopyMethods());
                            }

                            if (Object.keys(cp.getCopyMVariables()).length !== 0) {
                                copyVariableReport.push(cp.getCopyMVariables());
                            }
                        });
                    });

                    let results = {
                        'astReport': astReport.getASTDATA(),
                        'ast2Report': ast2Report.getASTDATA(),
                        'copyClassReport': copyClassReport,
                        'copyFunctionReport': copyFunctionReport,
                        'copyVariableReport': copyVariableReport
                    }
                    res.status(200).send({
                        code: '200',
                        data: results
                    });
                } else {
                    res.status(500).send('error parsing');
                    console.log('error parsing');
                }
            } catch (e) {
                console.error(e);
                return;
            }
        });
    }
};

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
