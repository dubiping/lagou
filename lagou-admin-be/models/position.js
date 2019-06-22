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
    find(conditions){
        return this.dbModel.find(conditions)
    }
    delete(id){
        return this.dbModel.findByIdAndRemove(id)
    }
    update(data){
        return this.dbModel.findByIdAndUpdate(data._id,data)
    }
}
module.exports = new PositionModel()