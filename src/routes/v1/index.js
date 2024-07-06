const expres = require('express');
const router = expres.Router();

const { AuthRequestMiddleware } = require('../../middleware')

const { HomeController } = require('../../controller/index')
const userRouter = require('./user-routes');

router.get('/info', AuthRequestMiddleware.checkAuth, HomeController.info)
router.use('/user', userRouter)

module.exports = router