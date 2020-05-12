import { Router } from 'express';
import { CopyVController } from '../controllers/CopyVController';

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

                const entrada = fs.readFileSync(route);
                const entrada2 = fs.readFileSync(route2);
                const ast = parser.parse(entrada.toString());
                const ast2 = parser.parse(entrada2.toString());

                fs.writeFileSync(routeJSON, JSON.stringify(ast, null, 2));
                res.sendFile(routeJSON);

                let cp = new CopyVController(JSON.stringify(ast), JSON.stringify(ast2));
            } catch (e) {
                console.error(e);
                return;
            }
        });
    }
};

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
