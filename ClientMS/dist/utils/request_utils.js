"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetcher = void 0;
const axios_1 = __importStar(require("axios"));
const error_utils_1 = require("./error_utils");
async function fetcher(res, url, method, body = null, params = null) {
    try {
        const axiosConfig = {
            method: method || "GET",
            data: body,
            params: params,
        };
        const { data: result } = await (0, axios_1.default)(url, axiosConfig);
        if (result.status === 200) {
            res.status(200).json(result.data);
            return;
        }
        if (result.status === 404) {
            res.status(404).json(result.message);
        }
        else if (result.status === 400) {
            res.status(400).json(result.message);
        }
        else if (result.status === 500) {
            res.status(500).json(result.message);
        }
        else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    catch (error) {
        console.log(error);
        if (error instanceof axios_1.AxiosError) {
            const err = error;
            if (err.response?.data)
                (0, error_utils_1.reportError)({ message: (0, error_utils_1.getErrorMessage)(err.response?.data) });
            res.status(err.response?.status || 500).json({ error: err.response?.data });
        }
        else {
            (0, error_utils_1.reportError)({ message: (0, error_utils_1.getErrorMessage)(error) });
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
exports.fetcher = fetcher;
