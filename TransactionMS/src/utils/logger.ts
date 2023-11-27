import { createLogger, format, transports } from 'winston';

const { combine, timestamp, prettyPrint } = format;

const myFormat = combine(
  timestamp(),
  prettyPrint(), 
);

const logger = createLogger({
  format: myFormat,
  transports: [
    new transports.Console({ format: myFormat }),
    new transports.File({ filename: 'logs/error.log', level: 'error'}),
    new transports.File({ filename: 'logs/combined.log' })
  ]  
});

export default logger;