import usersListTpl from '../../views/usersList'
import usersShow from '../../views/userShow'

import pagination from '../../components/pagination'
import page from '../../dataBus/page'

import { addUser } from './addUser'
import { usersList as usersListModel } from '../../models/users-list'
import { auth as authModel } from '../../models/auth'
import { remove } from '../common'

const pageSize = page.pageSize

let state = { list: [] }

// 填装list数据
const _list = (pageNo) => {
    let start = (pageNo - 1) * pageSize

    $('#userShow').html(userShow({
        // 每页的渲染内容数量
        data: state.list.slice(start, start + pageSize)
    }))

}


//从后端请求数据
const _loadData = async () => {
    let result = await usersListModel()
    state.list = result.data

    //分页
    pagination(result.data)

    //数据渲染
    _list(page.curPage)
}


//监听事件
const _subscribe = () => {
    $('body').on('changeCurpage', (e, index) => {
        _list(index)
    })

    $('body').on('addUser', e => {
        _loadData()
    })
}


const listUsers = (router) => {
    return async (req, res, next) => {

        let result = await authModel()
        if (result.ret) {

            next()
            res.render(usersListTpl({}))

            $('#add-user-btn').on('click', addUser)


            //初次渲染列表
            await _loadData()

            remove({
                $box: $('#users-list'),
                state, // 传递一个引用类型的值state, 在删除组件里能实时获取数据条数
                url: 'api/user'
            })


            // 订阅事件
            _subscribe()
        } else {
            router.go('/signin')
          }
    }
}

export default listUsers
