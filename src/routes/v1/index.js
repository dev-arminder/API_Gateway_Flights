const expres = require('express');
const router = expres.Router();

const { HomeController } = require('../../controller/index')
const userRouter = require('./user-routes');

router.get('/info', HomeController.info)
router.use('/user', userRouter)

module.exports = router