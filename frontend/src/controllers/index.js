import indexTpl from '../../views/index.art'
import {auth as authModel} from '../models/auth'
import _list from './user/userList'

import page from '../databus/page'
import img from '../../assets/006.jpg'







// 主页面
const index = (router) => {
    return async (req, res, next) => {

        let result = await authModel()
        if (result.ret) {
            const htmlIndex = indexTpl({
                // subRouter: res.subRoute(),
                img
            })

            // 渲染首页
            next(htmlIndex)

            // window resize, 让页面撑满整个屏幕
            $(window, '.wrapper').resize()

            // 加载页面导航
            pageHeader()


            // 用户管理 和 职位管理 的切换
            const $as = $('#sidebar-menu li:not(:first-child) a')
            let hash = location.hash
            $as.filter(`[href="${hash}"]`)
            .parent()
            .addClass('active')
            .siblings()
            .removeClass('active')


            //是否重置page
            if(hash !== page.curRoute) {
                page.reset()
            }


            // 当前url保存
            page.setCurPage(hash)



            // 登出事件绑定
            $('#users-signout').off('click').on('click', (e) => {
                e.preventDefault()
                localStorage.setItem('lg-token', '')
                location.reload()
            })





            var socket = io.connect('http://localhost:3000')

            socket.on('message', function(msg) {
                let num = ~~$('#icon-email').text
                $('#icon-email').text(++num)
            })
        } else {
            router.go('/signin')
        }
    }
}


    export default index