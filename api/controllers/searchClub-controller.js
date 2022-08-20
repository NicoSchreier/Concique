const model = require("../models/searchClub-model");

class searchClubController {
    getEvents(req, res) {
        const events = model.getEvents();
        try {
            res.send(events)
        }catch (e) {
            throw new Error("Something went wrong!")
        }
    }
}

module.exports = new searchClubController();