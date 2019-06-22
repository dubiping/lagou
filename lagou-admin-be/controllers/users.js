const UserModel = require('../models/users')
const Bcrypt = require('bcrypt')
const {getToken,checkToken} = require('../middlewares/oAuth')

class UserController {
    constructor() {

    }
    _hashPassword(pwd) {
        return Bcrypt.hash(pwd, 10)
    }
    // pwd 现在密码  hash数据库中数据
    _comparePassword(pwd, hash) {
        return Bcrypt.compare(pwd, hash)
    }
    async signup(req, res, next) {
        // 通过用户名寻找数据
        let info = await UserModel.findDataByName(req.body)
        if (info) {
            res.render('succ', {
                data: JSON.stringify({
                    message: '用户名已经存在。'
                })
            })
            return false
        }
        res.set('Content-Type', 'application/json; charset=utf-8')
        let password = await userController._hashPassword(req.body.password)
        let result = await UserModel.saveData({
            ...req.body,
            password
        })

        if (result) {
            res.render('succ', {
                data: JSON.stringify({
                    message: '用户注册成功。'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '用户注册失败。'
                })
            })
        }
    }
    async signin(req, res, next) {
        res.set('Content-Type', 'application/json; charset=utf-8')
        let result = await UserModel.findDataByName(req.body)

        if (result) {
            // 比较密码是否相同
            let isMatch = await userController._comparePassword(req.body.password, result['password'])
            if (isMatch) {
                // 创建session, 保存用户名
                // req.session.username = result['username']
                res.header('X-Access-Token',getToken(result['username']))
                res.render('succ', {
                    data: JSON.stringify({
                        username: result['username'],
                        message: '登录成功。'
                    })
                })
            }
            else {
                res.render('fail', {
                    data: JSON.stringify({
                        message: '密码错误。'
                    })
                })
            }
        }
        else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '用户不存在。'
                })
            })
        }
    }
    isSignin(req, res, next) {
        res.set('Content-Type', 'application/json; charset=utf-8')
        let token = req.header('X-Access-Token')
        let decoded = token ? checkToken(token) : false
        if (decoded) {
            res.render('succ', {
                data: JSON.stringify({
                    username: decoded.username,
                    isSignin: true
                })
            })
        } else {
            res.render('succ', {
                data: JSON.stringify({
                    isSignin: false
                })
            })
        }
    }
}
const userController = new UserController()
module.exports = userController