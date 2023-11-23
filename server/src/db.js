require("dotenv").config();
const { Sequelize } = require("sequelize");

const DriverModel = require('./models/Driver')
const TeamModel = require('./models/Team')

const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
} = process.env;

<<<<<<< HEAD
const sequelize = new Sequelize({
  database: "proyectodivers", // Nombre de la base de datos
  username: "postgres",  // Nombre de usuario de la base de datos
  password: "mario123",  // Contraseña de la base de datos
  host: "localhost",     // Host de la base de datos
  dialect: "postgres",   // Tipo de base de datos (PostgreSQL en este caso)
  port: 5433,            // Puerto de la base de datos
  logging: false,        // Desactivar la salida de registros SQL en la consola
=======
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=require`, {
  logging: false, 
  native: false, 
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


//definir los modelos que queremos usar en nuestra aplicacion
DriverModel(sequelize)
TeamModel(sequelize)
// Aca vendrian las relaciones
// Product.hasMany(Reviews);


const { Driver, Team } = sequelize.models;

Driver.belongsToMany(Team, { through: 'DriverTeam' });
Team.belongsToMany(Driver, { through: 'DriverTeam' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};