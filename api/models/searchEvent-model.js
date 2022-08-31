class Event {
    constructor(name, image, id, likes, views, location, dates, tags) {
        this.name = name;
        this.image = image;
        this.id = id;
        this.likes = likes;
        this.views = views;
        this.location = location;
        this.dates = dates;
        this.tags = tags;
    }
}

class searchEventModel {
    getEvents() {
        return events;
    }
}

let events = [

    new Event(
        "Event Location 1",
        "images/landingpage_event.jpg",
        1,
        43,
        312,
        "District 2",
        ["2022-06-24", "2022-06-25"],
        ["spacious", "indoors"]
    ),
    new Event(
        "Event Location 2",
        "images/landingpage_event.jpg",
        2,
        69,
        420,
        "District 1",
        ["2022-06-23", "2022-06-24", "2022-06-25"],
        ["well lit", "indoors"]
    ),
    new Event(
        "Event Location 3",
        "images/landingpage_event.jpg",
        3,
        187,
        666,
        "District 9",
        ["2022-06-20", "2022-06-21", "2022-06-22", "2022-06-23", "2022-06-24", "2022-06-25", "2022-06-26"],
        ["outdoors"]
    ),
    new Event(
        "Event Location 4",
        "images/landingpage_event.jpg",
        4,
        187,
        666,
        "District 1",
        ["2022-06-23", "2022-06-24"],
        ["small", "well lit"]
    ),
    new Event(
        "Event Location 5",
        "images/landingpage_event.jpg",
        5,
        187,
        666,
        "District 12",
        ["2022-06-24", "2022-06-25"],
        ["spacious", "well lit", "outdoors"]
    )];

const model = new searchEventModel();

module.exports = model;