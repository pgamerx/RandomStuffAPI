"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const new_keys = new mongoose_1.default.Schema({
    key: {
        type: String
    },
    email: {
        type: String,
        required: false
    }
});
exports.default = mongoose_1.default.model('latest api', new_keys);
