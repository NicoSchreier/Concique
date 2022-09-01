const model = require("../models/searchEvent-model");

class searchEventController {
    getEvents(req, res) {
        const events = model.getEvents();
        try {
            res.send(events)
        }catch (e) {
            throw new Error("Something went wrong!")
        }
    }
}

module.exports = new searchEventController();