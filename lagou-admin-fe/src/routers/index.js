import SmeRouter from 'sme-router'
import activeMiddleware from './active'
import IndexController from '../controllers/index'
import PositionController from '../controllers/position'

const router = new SmeRouter('router-view')

router.route('/index',IndexController.render)
router.route('/position',PositionController.render)
router.route('/position_add',PositionController.renderAddTpl)

router.route('*',(req,res,next)=>{
    res.redirect('/index')
})
router.use(activeMiddleware)