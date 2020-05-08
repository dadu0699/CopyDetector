import { Router } from 'express';

const fs = require('fs');
const path = require('path')
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
                let routeJSON = path.resolve(__dirname, '../ast.json');

                const entrada = fs.readFileSync(route);
                const ast = parser.parse(entrada.toString());

                fs.writeFileSync(routeJSON, JSON.stringify(ast, null, 2));
                res.sendFile(routeJSON);
            } catch (e) {
                console.error(e);
                return;
            }
        });
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
