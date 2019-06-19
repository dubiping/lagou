import UserTpl from '../views/user.html'

class Users {
  constructor() {
    this._init.apply(this, arguments)
  }
  async _init() {
    let result = await this._checkSignin()
    console.log(result)
    this._renderTpl(result.data)
    this._bindEvent()
  }
  _renderTpl({ isSignin = false, username = '' }) {
    let template = Handlebars.compile(UserTpl)
    let renderedUserTpl = template({
      isSignin,
      username
    })
    $('.user-menu').html(renderedUserTpl)
  }
  _bindEvent() {
    let that = this
    $('.user-menu').on('click', '#signout', () => {
      $.ajax({
        url: '/api/users/signout',
        success: (result) => {
          location.reload()
        }
      })
    })
    // 注册和登入按钮绑定事件
    $('#user').on('click', 'span', function (e) {
      // e.stopPropagation()
      if ($(this).attr('id') === 'user-signin') {
        $('.box-title').html('登录')
          that._doSign('/api/users/signin', 'signin')
      } else {
        $('.box-title').html('注册')
          that._doSign('/api/users/signup', 'signup')
      }
    })
  }
  _doSign(url,type) {
    // 确定按钮绑定事件
    $('#confirm').off('click').on('click', () => {
      $.ajax({
        url,
        type: 'POST',
        data: $('#user-form').serialize(),
        success: (result) => {
          if (type === 'signin') {
            this._signinSuccess(result)
          } else {
            alert(result.data.message)
          }
        }
      })
    })
  }
  _signinSuccess(result){
    if(result.ret){
      this._renderTpl({
        isSignin: true,
        username: result.data.username
      })
    }
  }
  _checkSignin(){
    return $.ajax({
      url: '/api/users/isSignin',
      success: function(result){
        return result
      }
    })
  }
}

export default Users