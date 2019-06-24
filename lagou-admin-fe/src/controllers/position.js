import PositionTpl from '../views/position-main.hbs'
import checkSignin from '../utils/oAuto'
import AddTpl from '../views/position-add.hbs'
import ListTpl from '../views/position-list.html'
import PageTpl from '../views/position-page.html'
import updateTpl from '../views/position-update.hbs'

let defaultPageSize = 5
let defaultPage = 1
async function render(req, res, next){
    let result = await checkSignin()
    
    if(result.data.isSignin){
        res.render(PositionTpl({}))
        renderList(req)
        bindPositionListEvent(req,res)
    }
    else{
        res.go('/index')
    }
}
// 渲染职位列表
async function renderList(req){
    let page = req.query && req.query.page || defaultPage
    let pagesize = req.query && req.query.pagesize || defaultPageSize
    let keywords = req.query && req.query.keywords || ''

    let info = await getPosData(page,pagesize,keywords)

    let renderedListTpl = template.render(ListTpl,{
        data: info.data.result,
        hasResult: info.data.result.length > 0,
        page:~~page,
        pagesize
    })
    $('.box-body').html(renderedListTpl)

    let renderedPageTpl = template.render(PageTpl,{
        pageCnt: Math.ceil(info.data.total / ~~pagesize),
        page:~~page,
        total: info.data.total,
        pagesize,
        keywords,
        url: location.hash.split('?')[0]
    })
    $('.pagination').html(renderedPageTpl)
}

function getPosData(page,pagesize,keywords){
    return $.ajax({
        url: '/api/position/find',
        headers: {
            'X-Access-Token': localStorage.getItem('token')
        },
        data: {
            page,
            pagesize,
            keywords
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

function bindPositionListEvent(req,res){
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
                    renderList(req)
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
    $('#possearch').on('click',(e)=>{
        res.go(`/position?page=1&pagesize=${defaultPageSize}&keywords=${$('#keywords').val()}`)
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
                res.go(`/position?page=1&pagesize=${defaultPageSize}&keywords=`)
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