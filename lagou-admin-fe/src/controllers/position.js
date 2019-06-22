import PositionTpl from '../views/position-list.hbs'
import checkSignin from '../utils/oAuto'
import AddTpl from '../views/position-add.hbs'

async function render(req, res, next){
    let result = await checkSignin()
    
    if(result.data.isSignin){
        let info = await getPosData()
        
        res.render(PositionTpl({
            data: info.data,
            hasResult: info.data.length > 0
        }))
        bindPositionListEvent(res)
    }
    else{
        res.go('/index')
    }
}

function getPosData(){
    return $.ajax({
        url: '/api/position',
        headers: {
            'X-Access-Token': localStorage.getItem('token')
        },
        success: function(result){
            return result
          }
    })
}

function renderAddTpl(req,res,next){
    res.render(AddTpl({}))
    bindPositionAddEvent(res)
}

function bindPositionListEvent(res){
    $('#addbtn').on('click',(e)=>{
        res.go('/position_add')
    })
    $('.box-body').on('click','.btn-del',function(){
        $.ajax({
            url: '/api/position',
            type: 'DELETE',
            data: {
                id: $(this).closest('tr').data('id')
            }
            ,
            headers: {
                'X-Access-Token': localStorage.getItem('token')
            },
            success(result){
                
            }
        })
    })
}
function bindPositionAddEvent(res){
    $('#posback').on('click', (e) => {
        res.back()
    })
    $('#possubmit').on('click', (e) => {
        $('#possave').ajaxSubmit({
          resetForm: true,
          headers: {
            'X-Access-Token': localStorage.getItem('token')
          },
          success(result) {
            res.back()
          }
        })
    })
}

export default{
    render,
    renderAddTpl
}