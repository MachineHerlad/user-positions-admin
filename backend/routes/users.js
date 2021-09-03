var express = require('express');
var router = express.Router();
const { signup, list, remove, isAuth, signin, signout } = require('../controllers/users')
const { auth } = require('../middlewares/auth')

/* GET users listing. */


router.get('/', auth, list);

router.post('/', auth, signup);
router.post('/signin', signin)

router.delete('/delete', auth, remove)
router.get('/isAuth', isAuth)
router.get('/signout', auth, signout)

module.exports = router;
