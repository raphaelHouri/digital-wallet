"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, prettyPrint } = winston_1.format;
const myFormat = combine(timestamp(), prettyPrint());
const logger = (0, winston_1.createLogger)({
    format: myFormat,
    transports: [
        new winston_1.transports.Console({ format: myFormat }),
        new winston_1.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston_1.transports.File({ filename: 'logs/combined.log' })
    ]
});
exports.default = logger;
