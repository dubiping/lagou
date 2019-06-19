import MenuTpl from '../views/menu.html'
import HomeTpl from '../views/home.hbs'
import Users from './user'

export default{
    render(req,res,next){
        $('.sidebar-menu').html(MenuTpl)
        res.render(HomeTpl({}))
        new Users()
    }
}