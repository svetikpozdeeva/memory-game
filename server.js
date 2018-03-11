const express = require('express');
const path = require('path');
const logger = require('morgan');
const http = require('http');
;
const port = 8080;

const __public = './dist';

const app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, __public)));

app.use('/*', function(req, res, next) {
	res.sendFile(path.join(__dirname, __public, 'index.html'));
});

const server = http.createServer(app);
server.listen(port);