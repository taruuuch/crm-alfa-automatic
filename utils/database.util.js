const Sequelize = require('sequelize')
const { DATABASE_URI } = require('../configs/database.config')
const User = require('../models/User').User

const connection = new Sequelize(
	'alfaautomatic',
	'dbalfaadmin',
	'qwerty123456',
	{
		host: 'localhost',
		dialect: 'postgres',
		port: '5432'
	}
)

connection.sync({ force: true })
	.then(() => {
		console.log(`Server connected to database!`)
		let testUser = {
			email: 'test@test.ua',
			password: '1234567'
		}

		try {
			User.create(testUser)
		} catch (e) {
			console.error(`Err: ${e.message}`)
		}
	})
	.catch(err => console.error(`Database error: ${err}`))

module.exports = connection
