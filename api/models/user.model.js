const model = (sequelize, Sequelize) => {
    const User = sequelize.define("user",
        {
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            userEmail: {
                type: Sequelize.STRING
            },
            userName: {
                type: Sequelize.STRING
            },
            userPassword: {
                type: Sequelize.STRING
            },
            userType: {
                type: Sequelize.STRING
            }
        },
        { underscored: true }
    );
  
    return User;
};

module.exports = model;