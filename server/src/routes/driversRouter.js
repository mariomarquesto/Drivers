const { Router } = require("express");
const driversHandler = require("../handlers/driversHandlers");
const driverByIdHandler = require("../handlers/driverbyIdHandler");
const createDriverHandler = require("../handlers/createDriverHandler");
const deleteDriverHandler = require('../handlers/deleteDriverHandler');

const driversRouter = Router();

driversRouter.get('/', driversHandler);
driversRouter.get('/:id', driverByIdHandler);
driversRouter.post("/", createDriverHandler);
driversRouter.delete('/:id', deleteDriverHandler); 

module.exports = driversRouter;
