const { positions } = require('../utils/db')

//添加职位
const add = (data) => {

    const position = new positions(data)
    return position.save()
}


//list数据
const list = () => {

    const result = positions.find({})
    return result
}


const remove = (id) => {
    
    return positions.deleteOne({ _id : id})
}

const update = (data) => {
    return positions.deleteOne({ _id : data.id, data})
}

const findone = (id) => {
    return positions.findOne({_id:id})
}

exports.add = add
exports.list = list
exports.remove = remove
exports.update = update
exports.findone = findone