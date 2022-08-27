const { Router } = require('express');
const controller = require('../controllers/bar-controller');

const routes = Router();

routes.get('/bar/dates', controller.getDates);
routes.get('/bar/dates/:dateNumber/places', controller.getDatePlaces);
routes.get('/bar/places/:id', controller.getPlace)

routes.post('/bar/dates/:dateNumber/places', controller.createPlace);
routes.put('/bar/places/:id', controller.updatePlace)
routes.delete('/bar/places/:id', controller.deletePlace)

routes.post('/bar/form', controller.sendForm)

module.exports = routes;
