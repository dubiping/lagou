import PositionTpl from '../views/position.hbs'

export default{
    render(req, res, next){
        res.render(PositionTpl({}))
    }
}