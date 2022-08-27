const model = require("../models/club-model");

class ClubController {
    static REQUIRED = ["name", "image", "likes", "views"];

    getDates(req, res) {
        res.send(model.getDates());
    }

    getDatePlaces(req, res) {
        res.send(model.getPlaces(req.params.dateNumber));
    }

    getPlace(req, res) {
        const place = model.getPlace(req.params.id);
        if (place) {
            res.send(place);
        } else {
            res.status(404).send(`Place with ID: ${req.params.id} not found`)
        }
    }

    checkPlaceProperties(res, place, id) {
        let result = true;

        const mandatoryNames = [...ClubController.REQUIRED];

        if (id) {
            mandatoryNames.push("id");
        }

        const containedNames = mandatoryNames.filter(c => c in place);
        if (containedNames.length < mandatoryNames.length) {
            const necessary = mandatoryNames.join(", ");
            const contained = containedNames.length === 0 ? "none of those" : "only " + containedNames.join(", ");
            res.status(400).send(`Place data must include ${necessary}, but ${contained} present.`);
            result = false;
        }

        if (id && result) {
            if (place.id !== id) {
                res.status(400).send(`Place data can only be updated if the id in the path (${id}) and the id in the body (${place.id}) match.`);
                result = false;
            }
        }
        return result;
    }

    createPlace = (req, res) => {

        const dateString = req.params.dateNumber;
        const place = req.body;
        try {
            const date = model.resolveDate(dateString);
            if (this.checkPlaceProperties(res, place)) {
                res.send(model.createPlace(date, place));
            }
        } catch (e) {
            res.status(404).send(`Date ${dateString} does not exist. Place can't be created.`)
        }
    }

    deletePlace(req, res) {
        const id = parseInt(req.params.id);

        if (!model.getPlace(id)) {
            res.status(404).send(`Place with id ${id} does not exist. Delete is not possible.`)
        } else {
            model.deletePlace(id);
            res.sendStatus(204);
        }
    }

    updatePlace = (req, res) => {
        const id = parseInt(req.params.id);

        if (!model.getPlace(id)) {
            res.status(404).send(`Place with id ${id} does not exist. Update is not possible.`)
        } else {
            const place = req.body;
            if (this.checkPlaceProperties(res, place, id)) {
                model.updatePlace(id, place);
                res.sendStatus(200);
            }
        }
    }

    sendForm = (req, res) => {
        // TODO
        console.log(req.body, "club");
        res.sendStatus(200);
    }
}

module.exports = new ClubController();
