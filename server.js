'use strict'

var express = require('express');
var app = express();
var path = require('path');

var staticPath = path.join(__dirname);
app.use(express.static(staticPath));

app.listen(3000, function () {
  console.log('Cheerful listening on port 3000!')
})
