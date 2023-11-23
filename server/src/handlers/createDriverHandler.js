const postCreateDriver = require('../controllers/postCreateDriver');

const createDriverHandler = async (req, res) => {
    const { forename,surname,description,image,nationality,dob, teams } = req.body;
    console.log(teams)
    try {
        
        const newDriver = await postCreateDriver(forename,surname,description,image,nationality,dob, teams)
        res.status(200).json(newDriver);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = createDriverHandler;