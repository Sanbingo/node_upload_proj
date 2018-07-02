var express = require('express')
var app = express()
var file = require("./upload.js")

app.use(express.static('static'));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/fileupload', file.upload)

app.listen(3003)
