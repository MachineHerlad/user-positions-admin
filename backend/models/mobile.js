const { positions } = require ("../utils/db");

exports.positions = (start, pageSize) => {

    return positions.find({}).skip(start).limit(pageSize).sort({_id:-1})
}