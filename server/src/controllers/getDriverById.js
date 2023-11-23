const axios = require("axios");
const { Driver, Team } = require('../db');



const URL_BASE = 'http://localhost:5000/drivers/'

const getDriverById = async (id)=>{
    let foundDriver;

    if (id.includes("-")) {

        const driver = await Driver.findByPk(id, { include: Team });
        if (driver) { //no hay pilotos en la DB con es id
       
            const driverData = {
                
                ...driver.datavalues,
                Team: driver.team,

            };
            return driver

           
        }
        
    } else {

        try {
            const response = await axios.get(`${URL_BASE}${id}`)
            return {
                ...response.data,
                Team: response.team,
            }


        } catch (error) {
            throw new Error(`Driver with ID ${id} not found in the API`);
        }        

    }

}

module.exports = getDriverById;
