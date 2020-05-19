import { Router } from 'express';
import { CopyVController } from '../controllers/CopyVController';
import { ErrorController } from '../controllers/ErrorController';

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

                let astReport;
                let copyClassReport;
                let copyFunctionReport;
                let copyVariableReport;

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
                } else if (primaryJSON.hasOwnProperty('class')
                    && secondaryJSON.hasOwnProperty('class')) {
                    let cp = new CopyVController(primaryAST, secondaryAST);

                    astReport = cp.getASTDATA();
                    copyClassReport = cp.getCopyClassData();
                    copyFunctionReport = cp.getCopyMethods();
                    copyVariableReport = cp.getCopyMVariables();

                    let results = {
                        'astReport': astReport,
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
