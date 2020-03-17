const jwt = require('jsonwebtoken')
const { TOKEN_SECRET, TOKEN_EXPIRES } = require('../configs/auth.config')

export const generateToken = (userId) => {
	const payload = { id: userId }
	const options = { expires: TOKEN_EXPIRES }

	return jwt.sign(payload, TOKEN_SECRET, options)
}
