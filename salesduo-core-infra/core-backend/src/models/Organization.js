// core-backend/src/models/Organization.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Organization = sequelize.define('Organization', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plan: {
        type: DataTypes.STRING,
        defaultValue: 'free' // Default plan for new signups
    }
});

module.exports = Organization;