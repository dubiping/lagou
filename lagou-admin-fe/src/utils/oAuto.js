export default function(){
    return $.ajax({
        url: '/api/users/issignin',
        headers: {
          'X-Access-Token': localStorage.getItem('token') || ''
        },
        success: function(result){
          return result
        }
    })
}