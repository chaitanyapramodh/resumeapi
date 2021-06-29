const fs = require('fs');
var path = require('path');

let errorLogger = function (err, req, res, next) {
    if (err) {
        var logger=fs.createWriteStream(path.join(__dirname,'errorLogger.log'), { flags: 'a' })
        logger.write(new Date() + " - " + err.message + "\n")
        if (err.status) {
            res.status(err.status)
        }
        else {
            res.status(500);
        }
        res.json({
            "status":500, 
            "message": err.message })
    }
    next();
}

module.exports = errorLogger;