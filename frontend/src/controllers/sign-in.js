import loginTpl from '../../views/login.art'
import { signin as signinModel} from '../models/signin'

const htmlLogin = loginTpl({})

const _handleSubmit = (router) => {
    return async (e) => {
        e.preventDefault()
        const data = $('#login').serialize()
        let result = await signinModel(data)
        const token = result.jqXHR.getResponseHeader('X-Access-Token')
        localStorage.setItem('lg-token', token)
        if(result.res.ret) {
            router.go('/index')
        }
    }
}


const login = (router) => {
    return (req, res, next) => {
        res.render(htmlLogin)

        $('#login').on('submit', _handleSubmit(router))
    }
}