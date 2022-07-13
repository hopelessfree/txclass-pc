const Home = require('../controllers/Home')
const router = require('koa-router')()

router.get('/', Home.index)
router.get('/list/:kw?', Home.list)
router.get('/error', Home.error)
router.get('*', Home.error)


module.exports = router
