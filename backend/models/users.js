// 操作数据库
const {Users} = require('../utils/db')


// 往数据库添加用户密码
const signup = ({username, password}) => {
    const users = new Users({
        username,
        password
    })
   return users.save()
}


// 在数据库查询用户名
const findUser = ((username) => {
    return Users.findOne({username})
})


// 在数据库查询所有用户列表
const findList = (() => {
    return Users.find().sort({_id:-1})
})


// 在数据库中删除用户
const removeUser = (id) => {
    return Users.deleteOne({_id:id})
}


exports.signup = signup
exports.findUser = findUser
exports.findList = findList
exports.removeUser = removeUser