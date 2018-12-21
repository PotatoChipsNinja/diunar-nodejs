const fs = require('fs')

function add(params) {
    fs.readFile('data.json', function(err, content) {
        if (!err) {
            content = JSON.parse(content.toString())
            params.id = (content.data.length ? (content.data[content.data.length - 1].id + 1) : 1)
            content.data.push(params)
            content.total = content.data.length
            fs.writeFile('data.json', JSON.stringify(content), function(err) {
                if (!err) {
                    console.log("Data added")
                }
            })
        }
    })
}

function del(id) {
    fs.readFile('data.json', function(err, content) {
        if (!err) {
            content = JSON.parse(content,toString())
            for (var i = 0; i < content.data.length; i++) {
                if (content.data[i].id == id) {
                    content.data.splice(i, 1)
                }
            }
            content.total = content.data.length
            fs.writeFile('data.json', JSON.stringify(content), function(err) {
                if (!err) {
                    console.log("Data deleted")
                }
            })
        }
    })
}

function mod(params) {
    fs.readFile('data.json', function(err, content) {
        if (!err) {
            content = JSON.parse(content,toString())
            for (var i = 0; i < content.data.length; i++) {
                if (content.data[i].id == params.id) {
                    for (var j in params) {
                        if (j != "id") {
                            content.data[i][j] = params[j]
                        }
                    }
                    break
                }
            }
            fs.writeFile('data.json', JSON.stringify(content), function(err) {
                if (!err) {
                    console.log("Data modified")
                }
            })
        }
    })
}

function res() {
    fs.readFile('data.json', function(err, content) {
        if (!err) {
            content = JSON.parse(content,toString())
            content.data.splice(0, content.data.length)
            content.total = content.data.length
            fs.writeFile('data.json', JSON.stringify(content), function(err) {
                if (!err) {
                    console.log("Data reset")
                }
            })
        }
    })
}

function reg(params) {
    fs.readFile('user.json', function(err, content) {
        if (!err) {
            content = JSON.parse(content.toString())
            content.user.push(params)
            content.total = content.user.length
            fs.writeFile('user.json', JSON.stringify(content), function(err) {
                if (!err) {
                    console.log("User added")
                }
            })
        }
    })
}

function login(usrid, passwd) {
    var res = "Incorrect Password"
    var content = fs.readFileSync('user.json');
    content = JSON.parse(content.toString())
    for (var i = 0; i < content.user.length; i++) {
        if (content.user[i].usrid == usrid && content.user[i].passwd == passwd) {
            res = content.user[i].nickname
            break
        }
    }
    return res
}

function modPsw(usrid, passwd) {
    fs.readFile('user.json', function(err, content) {
        if (!err) {
            content = JSON.parse(content,toString())
            for (var i = 0; i < content.user.length; i++) {
                if (content.user[i].usrid == usrid) {
                    content.user[i].passwd = passwd
                    break
                }
            }
            fs.writeFile('user.json', JSON.stringify(content), function(err) {
                if (!err) {
                    console.log("Password modified")
                }
            })
        }
    })
}

exports.add = add
exports.del = del
exports.mod = mod
exports.res = res
exports.reg = reg
exports.login = login
exports.modPsw = modPsw
