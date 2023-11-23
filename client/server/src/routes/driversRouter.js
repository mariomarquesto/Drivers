const { Router } = require("express");
const driversHandler = require("../handlers/driversHandlers");
const driverByIdHandler = require("../handlers/driverbyIdHandler");
const createDriverHandler = require("../handlers/createDriverHandler");
<<<<<<< HEAD
const deleteDriverHandler = require('../handlers/deleteDriverHandler');
=======
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658

const driversRouter = Router();

driversRouter.get('/', driversHandler);
driversRouter.get('/:id', driverByIdHandler);
driversRouter.post("/", createDriverHandler);
<<<<<<< HEAD
driversRouter.delete('/:id', deleteDriverHandler); 
=======

>>>>>>> 730aaec0e62698841c53269d193dd11555caf658

module.exports = driversRouter;
