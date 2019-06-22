import PositionTpl from '../views/position-main.hbs'
import checkSignin from '../utils/oAuto'
import AddTpl from '../views/position-add.hbs'
import ListTpl from '../views/position-list.html'
import updateTpl from '../views/position-update.hbs'

async function render(req, res, next){
    let result = await checkSignin()
    
    if(result.data.isSignin){
        res.render(PositionTpl({}))
        renderList()
        bindPositionListEvent(res)
    }
    else{
        res.go('/index')
    }
}
// 渲染职位列表
async function renderList(){
    let info = await getPosData()
        
    let template = Handlebars.compile(ListTpl)
    let renderedListTpl = template({
        data: info.data,
        hasResult: info.data.length > 0
    })
    $('.box-body').html(renderedListTpl)
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
                if(result.ret == true){
                    renderList()
                }
                else{
                    alert(result.data)
                }
            }
        })
    })
    $('.box-body').on('click','.btn-update',function(){
        res.go('/position_update/' + $(this).closest('tr').data('id'))
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
            if(result.ret == true){
                res.back()
            }
            else{
                alert(result.data)
            }
          }
        })
    })
}
function bindPositionUpdateEvent(res){
    $('#posback').on('click', (e) => {
        res.back()
    })
    $('#possubmit').on('click', (e) => {
        $('#posupdate').ajaxSubmit({
          resetForm: true,
          headers: {
            'X-Access-Token': localStorage.getItem('token')
          },
          success(result) {
            if(result.ret == true){
                res.back()
            }
            else{
                alert(result.data)
            }
          }
        })
    })
}

function updateData(req,res,next){
    $.ajax({
        url: '/api/position',
        data: {
          _id: req.params.id
        },
        headers: {
          'X-Access-Token': localStorage.getItem('token')
        },
        success(result) {
          if (result.ret) {
            res.render(updateTpl({...result.data[0]}))
            bindPositionUpdateEvent(res)
          } else {
            alert(result.data)
          }
        }
    })
}

export default{
    render,
    renderAddTpl,
    updateData
}