import { addUsers } from '../../models/addUser'

import page from '../../dataBus/page'
import addUserOne from '../../views/userAdd.art'

export const userSave = () => {
    $('addUserTwo').after(addUserOne())

    const saveBtn = async () => {
        const data = $('#userForm').serialize()
        let result = await addUsers(data)
        if(result.ret) {
            添加数据后渲染
            Page.setCurPage(1)

             //通知list页面重新刷新 
            $('body').trigger('addUser')
        }
        
        const $userClose = $('#userClose')
        $userClose.click()
       
    }
    
    // 点击添加事件
    $('#userSave').on('click', saveBtn)
}