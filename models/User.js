module.exports = (sequelize, DataTypes) => sequelize.define('User', {
	userId: {
		type: DataTypes.UUIDV4,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		unique: true
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	timestamps: false
})
