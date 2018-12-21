const express = require('express')
const url = require('url')
const fs = require('fs')
const http = require('http')
const https = require('https')
const json = require('./json')

const app = express()
const port = 3000
const SSLport = 3001

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/diunar.jl-lagrange.com.cn/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/diunar.jl-lagrange.com.cn/fullchain.pem'),
    requestCert: false,
    rejectUnauthorized: false
}

http.createServer(app).listen(port, () => console.log(`HTTP server is listening on port ${port}`))
https.createServer(options, app).listen(SSLport, () => console.log(`HTTPS server is listening on port ${SSLport}`))

app.get('/getData', (req, res) => res.download('data.json'))

app.get('/outData', function(req, res) {
    fs.readFile('data.json', function(err, content) {
        if (!err) {
            content = JSON.parse(content.toString())
            res.send(content)
        }
    })
})

app.get('/addData', function(req, res) {
    var params = url.parse(req.url, true).query
    json.add(params)
    res.send("Okay")
})

app.get('/delData', function(req, res) {
    var params = url.parse(req.url, true).query
    json.del(params.id)
    res.send("Okay")
})

app.get('/modData', function(req, res) {
    var params = url.parse(req.url, true).query
    json.mod(params)
    res.send("Okay")
})

app.get('/resData', function(req, res) {
    json.res()
    res.send("Okay")
})

app.get('/reg', function(req, res) {
    var params = url.parse(req.url, true).query
    json.reg(params)
    res.send("Okay")
})

app.get('/login', function(req, res) {
    var params = url.parse(req.url, true).query
    res.send(json.login(params.usrid, params.passwd))
})

app.get('/modPsw', function(req, res) {
    var params = url.parse(req.url, true).query
    json.modPsw(params.usrid, params.passwd)
    res.send("Okay")
})
