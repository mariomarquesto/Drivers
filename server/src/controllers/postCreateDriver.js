const { Driver, Team } = require('../db');

const postCreateDriver = async (forename,surname,description,image,nationality,dob,arrTeams) => {
  console.log(surname);
    const existingDriver = await Driver.findOne({
        where: {
          forename,
          surname,
        },
      });
    
      if (existingDriver) {
        const error = new Error('The pilot already exists');
        error.status = 409; 
        throw error;
      }
    console.log("Pasa por aca")
    const newDriver = await Driver.create({
        forename,
        surname,
        description,
        image,
        nationality,
        dob
    })

    // Asocia los equipos existentes al nuevo conductor
    for (const teamName of arrTeams) {
      const team = await Team.findOne({
        where: { name: teamName },
      });
      if (team) {
        await newDriver.addTeam(team);
      }
    }


    
    console.log("NewDriver: ", newDriver)
    return newDriver;
}

module.exports = postCreateDriver;