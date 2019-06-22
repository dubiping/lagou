const db = require('../utils/db')
const {formatDate} = require('../utils/common')

class PositionModel{
    constructor(){
        this.dbModel = db.model('positions',{
            companyLogo: String,
            companyName: String,
            positionName: String,
            city: String,
            salary: String,
            createTime: String
        })
    }
    // 保存用户数据
    save(data){
        let pos = new this.dbModel({
            ...data,
            createTime: formatDate(new Date(),'yyyy-MM-dd')
        })
        return pos.save()
    }
    // 通过用户名寻找数据
    findAll(){
        return this.dbModel.find({})
    }
}
module.exports = new PositionModel()