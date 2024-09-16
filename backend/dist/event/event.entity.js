"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const EventSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    dates: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.Event = mongoose_1.default.model('User', EventSchema);
