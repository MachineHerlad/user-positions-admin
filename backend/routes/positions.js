const express = require('express')
const router = express.Router()

const { add, list, remove, update, listone } = require('../controllers/positions')
const upLoadMiddleware = require('../middlewares/upLoad')

router.post('/add', add)
router.get('/list', list)
router.delete('/remove', remove)
router.patch('/updata', update)
router.listOne('/listone', listone)
router.post('/upload', upLoadMiddleware)

module.exports = router