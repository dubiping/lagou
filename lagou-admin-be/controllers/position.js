const PositionModel = require('../models/position')

class PositionController{
    constructor(){

    }
    async findAll(req, res, next) {
        res.set('Content-Type', 'application/json; charset=utf-8')
        let result = await PositionModel.findAll()
        res.render('succ', {data: JSON.stringify(result)})
    }
    async save(req,res,next){
       req.body.companyLogo = req.filename
        let result = await PositionModel.save(req.body)
        if(result){
            res.render('succ',{
                data: JSON.stringify({
                    message: '数据保存成功'
                })
            })
        }
        else{
            res.render('fail',{
                data: JSON.stringify({
                    message: '数据保存失败'
                })
            })
        }
    }
}
const positionController = new PositionController()

module.exports = positionController