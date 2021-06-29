
var express = require('express');
var path = require('path');
var fs=require('fs')
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
const morgan = require('morgan');
var bodyParser = require('body-parser')
const ErrorLogger = require('./utilities/errorlogger');
const cors=require('cors')
const port=process.env.PORT || 4442
var app = express();
app.use(bodyParser.json())
app.use(cors());
app.use('/uploads',express.static('./uploads'))

var accessLogStream=fs.createWriteStream(path.join(__dirname,'utilities','requestLogger.log'))
app.use(morgan('tiny',{stream:accessLogStream}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//error handler for invalid routes
app.use(ErrorLogger);

app.listen(process.env.PORT || 5000,()=>{
    console.log("started");
})

module.exports = app;