const getDriverById = require("../controllers/getDriverById");

const driverByIdHandler = async (req, res) => {
    //el id se recibe por params

    const { id } = req.params

    try {
        const driver = await getDriverById(id);
        res.status(200).json(driver);

    } catch (error) {
        res.status(400).json({error: error.message});
        
    }    
};


module.exports = driverByIdHandler
