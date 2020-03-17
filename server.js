require('dotenv/config')
const app = require('./app')

const PORT = process.env.PORT || 5000

async function start() {
	try {
		require('./utils/database.util')
		app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
	} catch (e) {
		console.log('Server start error: ', e.message)
		process.exit(1)
	}
}

start()
