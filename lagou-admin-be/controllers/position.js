const PositionModel = require('../models/position')

class PositionController{
    constructor(){

    }
    async find(req, res, next) {
        res.set('Content-Type', 'application/json; charset=utf-8')
        let result = await PositionModel.find(req.query)
        res.render('succ', {data: JSON.stringify(result)})
    }
    async save(req,res,next){
        res.set('Content-Type', 'application/json; charset=utf-8')
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
    async delete(req,res,next){
        res.set('Content-Type', 'application/json; charset=utf-8')
        let result = await PositionModel.delete(req.body.id)
        if(result){
            res.render('succ',{
                data: JSON.stringify({
                    message: '数据删除成功'
                })
            })
        }
        else{
            res.render('fail',{
                data: JSON.stringify({
                    message: '数据删除失败'
                })
            })
        }
    }
    async update(req,res,next){
        res.set('Content-Type', 'application/json; charset=utf-8')
        req.body.companyLogo === '' ? delete req.body.companyLogo
                                    : req.body.companyLogo = req.filename

        let result = await PositionModel.update(req.body)
        if(result){
            res.render('succ',{
                data: JSON.stringify({
                    message: '数据修改成功'
                })
            })
        }
        else{
            res.render('fail',{
                data: JSON.stringify({
                    message: '数据修改失败'
                })
            })
        }
    }
}
const positionController = new PositionController()

module.exports = positionController