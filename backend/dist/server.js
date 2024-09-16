"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const event_router_1 = require("./event/event.router");
const morgan = require('morgan');
const mongoose_1 = __importDefault(require("mongoose"));
const port = 3000;
const mongoURI = 'mongodb://127.0.0.1:27017/schedular';
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.addMiddlewares();
        this.connectDB();
        this.routes();
        this.start();
    }
    addMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(morgan('combined'));
        this.app.use((0, cors_1.default)());
    }
    connectDB() {
        mongoose_1.default.connect(mongoURI).then(() => {
            console.log('Connected to MongoDB');
        }).catch((err) => {
            console.error('Failed to connect to MongoDB', err);
        });
    }
    routes() {
        this.app.use('/api/v1/event', event_router_1.userRouter);
        this.app.get('/', (req, res) => {
            return res.send("Server is running");
        });
    }
    start() {
        this.app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
}
new App();
