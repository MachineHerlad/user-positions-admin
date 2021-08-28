const auth = (req, res, next) => {
    let token = req.get('X-Access-Token')
    try{
        let result = vertify(token)
        next()
    } catch(e) {
        res.render('fail', {
            data:JSON.stringify({
                message:'请登录'
            })
        })
    }
}

exports.auth = auth