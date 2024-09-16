"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vote = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const VotesSchema = new mongoose_1.default.Schema({
    eventId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
    },
    date: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now // Default to current date/time
    }
});
exports.Vote = mongoose_1.default.model('Vote', VotesSchema);
