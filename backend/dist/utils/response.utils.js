"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendResponse = void 0;
const sendResponse = (statusCode, response, data) => {
    return response.status(statusCode).json(data);
};
exports.sendResponse = sendResponse;
const sendError = (statusCode, response, data) => {
    return response.status(statusCode).json(data);
};
exports.sendError = sendError;
