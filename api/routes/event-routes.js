const { Router } = require('express');
const controller = require('../controllers/event-controller');

const routes = Router();

routes.get('/event/dates', controller.getDates);
routes.get('/event/dates/:dateNumber/places', controller.getDatePlaces);
routes.get('/event/places/:id', controller.getPlace)

routes.post('/event/dates/:dateNumber/places', controller.createPlace);
routes.put('/event/places/:id', controller.updatePlace)
routes.delete('/event/places/:id', controller.deletePlace)

routes.post('/event/form', controller.sendForm)

module.exports = routes;