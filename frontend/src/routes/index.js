import SMERouter from 'sme-router'
import { index } from '../controllers/index.js'
import { login } from '../controllers/sign-in'
import { positionsList } from '../controllers/positions/positions-list'
// import {routerGuard as rgModel} from '../models/router-guard'

const router = new SMERouter('root')

// router.use(async (req) => {
//     //第一个打开的页面
//      let result = await rgModel()
//     if(result.ret) {
//         router.go('/index')
//     }else {
//         router.go('signin')
//     }

// })


router.route('/', login(router))

router.route('/index', index(router))
router.route('/index/positions', positionsList(router))

export default router