// 用于数据库数据操作
const db = require('../utils/db')

class UserModel{
    constructor(){
        this.dbModel = db.model('users',{
            username: String,
            password: String
        })
    }
    // 保存用户数据
    saveData(data){
        let users = new this.dbModel(data)
        return users.save()
    }
    // 通过用户名寻找数据
    findDataByName(data){
        return this.dbModel.findOne({username: data.username})
    }
}
module.exports = new UserModel()