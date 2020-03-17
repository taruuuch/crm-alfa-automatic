const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { validationResult } = require('express-validator')
const { TOKEN_EXPIRES } = require('../configs/auth.config')
const { generateToken } = require('../utils/auth.util')
const { INVALID_DATA, AUTH_ERROR, USER_NOT_FOUND, INVALID_PASSWORD, AUTH_SUCCESS } = require('../constants/auth.constants')

exports.signIn = async (req, res) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				message: INVALID_DATA,
				errors: errors.array()
			})
		}

		const { email, password } = req.body

		const user = await User.findOne({
			where: { email }
		}) //Search user in pg db

		if (!user) {
			return res.status(400).json({ message: USER_NOT_FOUND })
		}

		const isMatch = await bcrypt.compare(password, user.password)

		if(!isMatch) {
			return res.status(400).json({ message: INVALID_PASSWORD })
		}

		res.json({
			message: AUTH_SUCCESS,
			token: {
				accessToken: generateToken(user.id),
				expires: TOKEN_EXPIRES
			}
		})
	} catch (e) {
		res.status(500).json({ message: `${AUTH_ERROR}: ${e.message}` })
	}
}
