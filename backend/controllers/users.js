const userModel = require('../models/users')
const { hash, verify, compare, sign } = require('../utils/tools.js')



//注册用户
const signup = async (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf-8')
    const { username, password } = req.body

    //密码加密
    let bcryptPassword = await hash(password)

    let findResult = await userModel.findUser(username)

    // 判断用户是否存在
    if (findResult) {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户名已存在'
            })
        })
    } else {
        // 不存在则添加此用户
        await userModel.signup({
            username,
            password: bcryptPassword
        })

        res.render('succ', {
            // JSON.stringify()方法:  JavaScript 对象转换为 JSON 字符串

            data: JSON.stringify({
                username,
                password: bcryptPassword
            })
        })
    }

}


//登录用户
const signin = async (req, res, next) => {
    const { username, password } = req.body
    let result = await usersModel.findUser(username)

    if (result) {
        let { password: hash } = result
        let compareResult = compare(password, hash)

        if (compareResult) {

            // 1.session-coolie 验证用户登录
            /* const sessionId = randomstring.generate()// 生成一个随机的字符串

            // 往前端种cookie
            res.set('Set-Cookie', `sessionId=${sessionId}; Path=/; HttpOnly` ) */



            // 2.通过 token 令牌的方式验证用户登录
            const token = sign(username)//通过私钥生成token
            res.set('Access-Control-Expose-Headers', 'X-Access-Token')
            res.set('X-Access-Token', token)

            res.render('succ', {
                data: JSON.stringify({
                  username
                })
              }) 



        } else {

            res.render('fail', {
              data: JSON.stringify({
                message: '用户名或密码错误。'
              })
            })
          }
    } else {

        res.render('fail', {
          data: JSON.stringify({
            message: '用户名或密码错误。'
          })
        })
      }

}

//用户列表
const list = async (req, res) => {
    const listResult = await userModel.findList()

    if (listResult) {
        res.render('succ', {
            data: JSON.stringify(listResult)
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '获取list数据失败'
            })
        })
    }

}

const signout = async (req, res) => {
    req.session.username = ''
    res.render('succ', {
        data:JSON.stringify({
            message:'已退出登录。'
        })
    })
}


//删除用户
const remove = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf-8')
    const { id } = req.body
    await userModel.removeUser(id)
    res.render('succ', {
        data: JSON.stringity({
            message: '删除成功！'
        })
    })
}


const isAuth = async (req, res) => {
    let token = req.get('X-Access-Token') //?
    try {
        let result = verify(token)
        res.render('succ', {
            data: JSON.stringify({
                username: result.username
            })
        })
    } catch (err) {
        res.render('fail', {
            data: JSON.stringify({
                message: '请登录。'
            })
        })
    }
}


exports.signup = signup
exports.signin = signin
exports.list = list
exports.remove = remove
exports.isAuth = isAuth
exports.signout = signout