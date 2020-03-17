const { Router } = require('express')
const authController = require('../controllers/auth.controller')
const router = Router()

router.post(
	'/signin',
	authController.signIn
)

module.exports = router
