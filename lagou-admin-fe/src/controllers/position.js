import PositionTpl from '../views/position.hbs'

export default{
    render(req, res, next){
        console.log("bbbbb")
        res.render(PositionTpl({}))
    }
}