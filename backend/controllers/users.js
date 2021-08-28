const userModel = require('../models/users')
const { hash } = require('../utils/tools.js')



//注册用户
const signup = async (req,res, next) => {
    res.set('content-type', 'application/json; charset=utf-8')
    const {username, password} = req.body

    //密码加密
    let bcryptPassword = await hash(password)

    let findResult = await userModel.findUser(username)

    // 判断用户是否存在
    if (findResult) {
        res.render('fail', {
            data:JSON.stringify({
                message:'用户名已存在'
            })
        })
    }else {
        // 不存在则添加此用户
        await userModel.signup({
            username,
            password: bcryptPassword
        })
        
        res.render('succ', {
            // JSON.stringify()方法:  JavaScript 对象转换为 JSON 字符串

            data:JSON.stringify({
                username,
                password: bcryptPassword 
            })
        })
    }

}

//用户列表
const list =  async (req, res) => {
    const listResult = await userModel.findList()

    if (listResult) {
        res.render('succ', {
            data:JSON.stringify(listResult)
        })
    } else {
        res.render('fail', {
            data:JSON.stringify({
                message: '获取list数据失败'
            })
        })
    }
    
}


//删除用户
const remove = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf-8')
    const { id } = req.body
    await userModel.removeUser(id)
    res.render('succ', {
        data:JSON.stringity({
            message:'删除成功！'
        })
    })
}


exports.signup = signup
exports.list = list
exports.remove = remove