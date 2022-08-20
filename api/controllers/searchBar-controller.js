const model = require("../models/searchBar-model");

class searchBarController {
    getEvents(req, res) {
        const events = model.getEvents();
        try {
            res.send(events)
        }catch (e) {
            throw new Error("Something went wrong!")
        }
    }
}

module.exports = new searchBarController();