const model = (sequelize, Sequelize) => {
    const Quiz = sequelize.define("quiz",
        {
            quizId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            quizName: {
                type: Sequelize.STRING
            },
            quizInstruction: {
                type: Sequelize.STRING
            },
            quizSlug: {
                type: Sequelize.STRING
            },
            quizDuration: {
                type: Sequelize.STRING
            },
            quizIsEnabled: {
                type: Sequelize.BOOLEAN
            },
            quizIsDeleted: {
                type: Sequelize.BOOLEAN
            }
        },
        { underscored: true }
    );
  
    return Quiz;
};

module.exports = model;