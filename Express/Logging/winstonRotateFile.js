var winston = require('winston');

winston.add(require('winston-daily-rotate-file'), {datePattern:'yyyyMMdd', filename:'service.log.'});

winston.info('Info Message');
winston.warn('Warning Message');
winston.error('Error Message');
