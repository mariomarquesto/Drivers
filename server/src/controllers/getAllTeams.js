const { Team } = require('../db');
const axios = require('axios');

const getAllTeams = async () => {
  try{
  
  const allTeamsDb = await Team.findAll();
  
  if (!allTeamsDb.length) {
    try {
      const response = await axios.get('http://localhost:5000/drivers');
      const drivers = response.data;
   

        const teamArrays = drivers.map(driver => driver.teams);


        const definedTeams = teamArrays.filter(teams => teams !== undefined);


        const splitTeams = definedTeams.reduce((acc, teams) => {
          const teamsArray = teams.split(',').map(team => team.trim());
          return [...acc, ...teamsArray];
        }, []);


      const uniqueTeamsSet = new Set(splitTeams);

      const driverTeams = [...uniqueTeamsSet];
      
      const teamObjects = driverTeams.map(name => ({ name }));
      await Team.bulkCreate(teamObjects);
      return driverTeams.sort();

    } catch (error) {
        console.error('Error al obtener los equipos de la API:', error);
      return [];
    }
  } else {
    
    const driverTeams = allTeamsDb.map(driver => driver.name)

    return driverTeams.sort();
  }
}
catch(error){
  console.error('Error al devolver Teams:', error)
}
  
}

module.exports = getAllTeams;