"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const event_controller_1 = require("./event.controller");
const response_utils_1 = require("../utils/response.utils");
const event_validator_1 = require("./event.validator");
const router = express_1.default.Router();
router.get("/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield event_controller_1.eventController.getEventList();
        return (0, response_utils_1.sendResponse)(200, res, data);
    }
    catch (error) {
        return (0, response_utils_1.sendResponse)(500, res, error);
    }
}));
router.post("/", event_validator_1.eventValidationRules, event_validator_1.validate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = yield event_controller_1.eventController.createEvent(body);
        return (0, response_utils_1.sendResponse)(201, res, data);
    }
    catch (error) {
        return (0, response_utils_1.sendResponse)(500, res, error);
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield event_controller_1.eventController.getEvent(id);
        return (0, response_utils_1.sendResponse)(200, res, data);
    }
    catch (error) {
        return (0, response_utils_1.sendResponse)(500, res, error);
    }
}));
router.post("/:id/vote", event_validator_1.voteValidationRules, event_validator_1.validate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { id } = req.params;
        const data = yield event_controller_1.eventController.createVote(id, body);
        return (0, response_utils_1.sendResponse)(201, res, data);
    }
    catch (error) {
        return (0, response_utils_1.sendResponse)(500, res, error);
    }
}));
router.get("/:id/results", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield event_controller_1.eventController.getResult(id);
        return (0, response_utils_1.sendResponse)(200, res, data);
    }
    catch (error) {
        return (0, response_utils_1.sendResponse)(500, res, error);
    }
}));
exports.userRouter = router;
