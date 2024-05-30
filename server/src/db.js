require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize({
  database: "countries", // Nombre de la base de datos
  username: "postgres",  // Nombre de usuario de la base de datos
  password: "mario123",  // Contraseña de la base de datos
  host: "localhost",     // Host de la base de datos
  dialect: "postgres",   // Tipo de base de datos (PostgreSQL en este caso)
  port: 5433,            // Puerto de la base de datos
  logging: false,        // Desactivar la salida de registros SQL en la consola
});

const basename = path.basename(__filename);
const modelDefiners = [];

// Read all the files from the models directory and push them into the modelDefiners array
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Inject the sequelize connection into all the models
modelDefiners.forEach(model => model(sequelize));

// Capitalize model names and attach to sequelize.models
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(([key, value]) => [key.charAt(0).toUpperCase() + key.slice(1), value]);
sequelize.models = Object.fromEntries(capsEntries);

// Extract models
const { Driver, Team } = sequelize.models;

// Define relationships
Driver.belongsToMany(Team, { through: 'DriverTeam' });
Team.belongsToMany(Driver, { through: 'DriverTeam' });

module.exports = {
  ...sequelize.models, // Export models (e.g., const { Driver, Team } = require('./db.js');)
  conn: sequelize,     // Export connection (e.g., const { conn } = require('./db.js');)
};
