const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {

    const attributes = {
        questionName: { type: DataTypes.STRING, allowNull: false },
        questionType: { type: DataTypes.NUMBER, allowNull: false },
        questionTitle: { type: DataTypes.STRING, allowNull: false },
        questionContent: { type: DataTypes.STRING, allowNull: false },
        questionDescription: { type: DataTypes.STRING, allowNull: false },
        questionLevel: { type: DataTypes.NUMBER, allowNull: false },
        questionCaregory: { type: DataTypes.NUMBER, allowNull: false },
        questionAnswer: { type: DataTypes.STRING, allowNull: false },
        questionPoint: { type: DataTypes.NUMBER, allowNull: false },
        questionExam: { type: DataTypes.NUMBER, allowNull: false },
        createdBy: { type: DataTypes.NUMBER, allowNull: false },
    };

    return sequelize.define('Question', attributes);
}