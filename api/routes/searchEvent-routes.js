const { Router } = require('express');
const controller = require('../controllers/searchEvent-controller');

const routesSearchEvent = Router();

routesSearchEvent.get('/eventEvents', controller.getEvents);

module.exports = routesSearchEvent;