const axios = require("axios");
const { Driver, Team } = require("../db");
const imgDefault = "https://images.pexels.com/photos/163444/sport-treadmill-tor-route-163444.jpeg";

module.exports = async () => {
  // Hacer una solicitud GET a la API externa en localhost:5000/drivers
  const apiResponse = await axios.get("http://localhost:5000/drivers");

  // Obtener los datos de los conductores desde la API
  const apiDrivers = apiResponse.data.map((apiDriver) => {
    return {
      id: apiDriver.id,
      forename: apiDriver.name.forename,
      surname: apiDriver.name.surname,
      image: apiDriver.image.url || imgDefault,
      dob: apiDriver.dob,
      teams: apiDriver.teams,
      nationality: apiDriver.nationality // Agregado este campo desde la versión HEAD
    };
  });

  // Obtener los conductores de la base de datos
  const dbDrivers = await Driver.findAll({
    include: Team,
  });

  // Combinar los conductores de ambas fuentes en un solo arreglo
  const allDrivers = [...dbDrivers, ...apiDrivers];

  // Envía la lista de conductores combinados como respuesta
  return allDrivers;
};
