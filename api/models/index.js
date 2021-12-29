const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

/**
 * Instance of Sequelize
 */
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  define: {
    freezeTableName: true
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  timezone: '+00:00'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/**
 * Append imports as needed
 */

db.user = require('./user.model')(sequelize, Sequelize);

module.exports = db;