const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        examName: { type: DataTypes.STRING, allowNull: false },
        totalPoint: { type: DataTypes.NUMBER, allowNull: false },
        userId: { type: DataTypes.NUMBER, allowNull: false },
        totalTime: { type: DataTypes.NUMBER, allowNull: false }
    };

    return sequelize.define('Exam', attributes);
}