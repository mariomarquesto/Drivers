const getDriverByName = require("../controllers/getDriverByName");

const driverByNameHandler = async (req, res) => {
    //cuando se recibe datos por query, la ruta no se rompe

    const { name } = req.query;

    try {
        const drivers = await getDriverByName(name);
        res.status(200).json(drivers);

    } catch (error) {
        res.status(400).json({error: error.message});
        
    }    
};


module.exports = driverByNameHandler
