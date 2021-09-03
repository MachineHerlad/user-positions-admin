import router from './routes'


$.ajax({
    url:'api/users/isAuth',
    success(result){
        if(result.ret) {
            router.go('./index')
        } else {
            router.go('./')
          
        }
    }
})