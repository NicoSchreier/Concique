const { Router } = require('express');
const controller = require('../controllers/club-controller');

const routes = Router();

routes.get('/club/dates', controller.getDates);
routes.get('/club/dates/:dateNumber/places', controller.getDatePlaces);
routes.get('/club/places/:id', controller.getPlace)

routes.post('/club/dates/:dateNumber/places', controller.createPlace);
routes.put('/club/places/:id', controller.updatePlace)
routes.delete('/club/places/:id', controller.deletePlace)

routes.post('/club/form', controller.sendForm)

module.exports = routes;
