import indexTpl from '../../views/index.art'
import userList from '../../views/userList.art'
import addUserOne from '../../views/userAdd.art'
import  {userSave}  from './user/addUser'

import img from '../../assets/006.jpg'


const htmlIndex = indexTpl({
    img
})


let dataList = []
const pageSize = 10
const curPage = 1




const _subscribe = () => {
    $('body').on('changeCurPage', (e, index) => {
        _list(index)
    })
    $('body').on('addUser', (e) => {
        _loadData()
    })
}


// 主页面
const index = (router) => {
    return (req, res, next) => {
        //渲染首页
        res.render(htmlIndex)

        // 填充用户列表
        $('#content').html(userList())

        // 渲染list
        _loadData()
        $('#addUserTwo').after(addUserOne())
        $('#addUser').on('click', userSave)
    }
}

export { index }