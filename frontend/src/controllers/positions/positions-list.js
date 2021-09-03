import { positionsList } from "../../models/positions";
import { auth as authModel } from '../../models/auth'

import positionsTpl from '../../views/positionList.art'
import { addPosition } from "./add-position";
import { remove } from "../../models/remove";
import { updatePosition } from "./update-position";



//填装list数据
const _list = (pageNo) => {
    let start = (pageNo - 1) * pageSize

    $('#positions-list').html(positionsTpl({
        data: state.list.slice(start, start + pageSize)
    }))
    
}






const _loadData = async () => {
    const list = await positionsList()
    state.list = list

    pagination(list)

    _list(page.curPage)
}



const _subscribe = () => {
    $('body').off('changeCurpage').on('changeCurpage', (e, index) => {
        _list(index)
    })
    $('body').off('addPositions').on('addPositions', (e) => {
        _loadData()
    })
}



export const positionsList = (router) => {

    return (req, res, next) => {

        let result = authModel()
        if (result.ret) {

            next()
            res.render(positionsTpl())


            // 初次渲染list
            _loadData()


            //订阅事件
            _subscribe()


            //添加职位
            addPosition()


            remove({
                $box:$('positions-list'),
                state,
                url: 'api/positions/remove',
                loadData: _loadData
            })


            updatePosition()
        }
    }
}