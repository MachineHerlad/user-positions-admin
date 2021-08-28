import pagination from '../../public/page'
import userListTpl from '../../views/userList.art'
import userShowTpl from '../../views/userShow.art'
import Page from '../../dataShare/pageData'
import { userList } from '../../models/userList'
import { userSave } from './addUser'
import { remove } from '../../public/remove'

const pageUserList = Page.pageUserList

let state = { list: [] }

// 填装list数据
const list = (pageNo) => {
    let start = (pageNo - 1) * pageSize
    
    $('#userShow').html(userShow({
        // 每页的渲染内容数量
        data: dataList.slice(start, start + pageSize)
    }))

}
