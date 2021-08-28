var express = require('express');
var router = express.Router();
const { signup, list, remove } = require('../controllers/users')

/* GET users listing. */


router.get('/', list);

router.post('/', signup);

router.delete('/delete', remove)

module.exports = router;
