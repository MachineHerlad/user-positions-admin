const express = require('express')
const router = express.Router()

const { add, list, remove, update } = require('../controllers/positions')
const upLoadMiddleware = require('../middlewave/upLoad')

router.post('./add', add)
router.get('./list', upLoadMiddleware, list)
router.delete('./remove', remove)
router.patch('./updata', update)

module.exports = router