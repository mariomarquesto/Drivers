const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');

const PORT = 3001;


const { Driver, Team } = require('./src/db') // Asegúrate de importar tus modelos para crear el registro


conn.sync({ force: true })
.then( async () => {

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))




