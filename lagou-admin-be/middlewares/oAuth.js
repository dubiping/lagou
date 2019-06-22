const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

// 生成token
const getToken = (username)=>{
    let cert = fs.readFileSync(path.resolve(__dirname,'../keys/private.key'))
    return jwt.sign({username},cert,{algorithm: 'RS256'})
}

// 验证token
const checkToken = (token)=>{
    let cert = fs.readFileSync(path.resolve(__dirname,'../keys/public.key'))
    return jwt.verify(token,cert)
}

const isContinue = (req,res,next)=>{
    let token = req.header('X-Access-Token')
    let decoded = token ? checkToken(token) : false
    if (decoded) {
        next()
    } else {
        res.set('Content-Type', 'application/json; charset=utf-8')
        res.render('succ', {
            data: JSON.stringify({
                isSignin: false
            })
        })
    }
}

module.exports = {
    getToken,
    checkToken,
    isContinue
}