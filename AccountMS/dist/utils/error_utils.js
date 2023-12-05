"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportError = exports.getErrorMessage = void 0;
const logger_1 = __importDefault(require("./logger"));
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
exports.getErrorMessage = getErrorMessage;
const reportError = ({ message }) => {
    // send the error to our logging service...
    logger_1.default.error(message);
};
exports.reportError = reportError;
