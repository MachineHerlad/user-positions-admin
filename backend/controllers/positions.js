const positionsModel = require('../models/positions')
const moment = require('moment')

exports.add = async (req, res, next) => {

    res.set('content-type', 'application/json; charset = utf-8')
    let result = await positionsModel.add({
        ... req.body,
        releaseTime: moment().format('YYYY年MM月DD日  HH:mm')
    })

    if (result) {
        res.render('succ', {
            data:JSON.stringify({
                message:'职位添加成功'
            })
        })
    }else {
        res.render('fail', {
            data:JSON.stringify({
                message:'职位添加失败'
            })
        })
    }
}

exports.list = async (req, res, next) => {

    res.set('content-type', 'application/json; charset = utf-8')
    let result = await positionsModel.list()
    if(result) {
        res.JSON(result)
    }else {
        res.render('fail', {
            data:JSON.stringify({
                message:'获取信息失败'
            })
        })
    }
}

exports.listone = async (req, res, next) => {
    let result = await positionsModel.findone(req.body.id)
    if(result) {
        res.JSON(result)
    } else {
        res.render('fail', {
            data:JSON.stringify({
                message:'数据获取失败。'
            })
        })
    }
}

exports.remove = async (req, res, next) => {

    res.set('content-type', 'application/json; charset = utf-8')
    let result = await positionsModel.remove(req.body.id)

    try{
        if(result.deletedCount > 0) {
            res.render('succ', {
                data:JSON.stringify({
                    message:'删除职位成功'
                })
            })
        }else {
            res.render('fail', {
                data:JSON.stringify({
                    message:'删除职位失败'
                })
            })
        }
    }catch(err){
        res.render('fail', {
            data:JSON.stringify({
                message:'删除职位失败'
            })
        })
    }
    
}

exports.update = async (req, res, next) => {

    res.set('content-type', 'application/json; charset = utf-8')

    const data = {
        ...req.body
    }


    if(req.companyLogo) {
        data['companyLogo'] = req.companyLogo
    }

    let result = await positionsModel.update(data)

    if (result) {
        res.render('succ', {
            data:JSON.stringify({
                message:'职位修改成功'
            })
        })
    }else {
        res.render('fail', {
            data:JSON.stringify({
                message:'职位修改失败'
            })
        })
    }
}