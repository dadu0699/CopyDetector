"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.Port || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default({
            origin: '*'
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({
            // application/x-www-form-urlencoded
            extended: true
        }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        // this.app.use('/api/index', indexRoutes);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Listening on', this.app.get('port'));
        });
    }
}
;
const server = new Server();
server.start();
