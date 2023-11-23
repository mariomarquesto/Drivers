const getAllDrivers = require("../controllers/getAllDrivers");
const getDriverByName = require("../controllers/getDriverByName");

const driversHandler = async (req, res) => {
    //cuando recibo datos por query, la ruta no se rompe

    const { name } = req.query;


    try {
        const drivers = name ? await getDriverByName(name) : await getAllDrivers();
        res.status(200).json(drivers);

    } catch (error) {
        res.status(400).json({error: error.message});
        
    }    
};


module.exports = driversHandler

