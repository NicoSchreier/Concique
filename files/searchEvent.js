class Event {

    constructor(name, image, likes, views, id, location, dates, tags) {

        this.name = name;
        this.image = image;
        this.likes = likes;
        this.views = views;
        this.id = id;
        this.location = location;
        this.dates = dates;
        this.tags = tags;
    }
}

class SearchPage {

    // Add Event Type
    addEventType(type) {

        document.querySelector(".pageTitle").append("Search for a " + type);
    }

    // Add Event Location
    addEventLocations(locations) {

        for (const location of locations) {

            this.addEventLocationToDOM(location);
        }
    }

    addEventLocationToDOM(location) {

        let eventLocation = document.createElement("option");
        eventLocation.append("District " + location);
        document.querySelector("#where").append(eventLocation);
    }

    // Add Event Tag
    addEventTags(tags) {

        for (const tag of tags) {

            this.addEventTagToDOM(tag);
        }
    }

    addEventTagToDOM(tag) {

        let eventTag = document.createElement("option");
        eventTag.append(tag);
        document.querySelector("#what").append(eventTag);
    }

    // Add Event
    addEvents(events) {

        for (const event of events) {

            this.addEventToDOM(event);
        }
    }

    addEventToDOM(event) {

        // Create article
        let article = document.createElement("article");
        article.setAttribute("id", event.id);

        // Create wallPaper
        let wallPaper = document.createElement("div");
        wallPaper.setAttribute("class", "wallPaper");
        let image = document.createElement("img");
        image.setAttribute("src", event.image);
        image.setAttribute("class", "wallPaperImage");
        wallPaper.append(image);

        // Create name
        let name = document.createElement("h2");
        name.setAttribute("class", "name");
        name.append(event.name);

        // Create detailsButton
        let detailsButtonContainer = document.createElement("div");
        detailsButtonContainer.setAttribute("class", "detailsButtonContainer");
        let detailsButton = document.createElement("button");
        detailsButton.setAttribute("type", "button");
        detailsButton.setAttribute("class", "detailsButton");
        let buttonIcon = document.createElement("ion-icon");
        buttonIcon.setAttribute("name", "chevron-forward-outline");
        buttonIcon.setAttribute("class", "detailButtonIcon");
        detailsButton.append(buttonIcon);
        detailsButtonContainer.append(detailsButton);

        // Create likeLabel
        let likeLabel = document.createElement("button");
        likeLabel.setAttribute("type", "text");
        likeLabel.setAttribute("class", "infoLabel");
        let likeIcon = document.createElement("ion-icon");
        likeIcon.setAttribute("name", "heart");
        let likeCount = document.createElement("label");
        likeCount.append(event.likes);
        likeLabel.append(likeIcon);
        likeLabel.append(likeCount);

        // Create viewsLabel
        let viewsLabel = document.createElement("button");
        viewsLabel.setAttribute("type", "text");
        viewsLabel.setAttribute("class", "infoLabel");
        let viewsIcon = document.createElement("ion-icon");
        viewsIcon.setAttribute("name", "eye");
        let viewsCount = document.createElement("label");
        viewsCount.append(event.views);
        viewsLabel.append(viewsIcon);
        viewsLabel.append(viewsCount);

        // Add properties to article
        article.append(wallPaper);
        article.append(name);
        article.append(detailsButtonContainer);
        article.append(likeLabel);
        article.append(viewsLabel);

        // Add article to page
        document.querySelector("#clubList").append(article);
    }

    // Filter locations
    filterEvents(events, location, date, tag) {

        let eventList = [];

        for (const event of events) {

            console.log("EVENT " + event.name);

            // Check location
            if ((location !== "All locations" && event.location !== location)) {

                continue;
            }

            // Check dates

            let correctDate = false;

            for (let i = 0; i < event.dates.length; i++) {

                if (event.dates[i] === date) {

                    correctDate = true;
                    break;
                }
            }

            if (!correctDate) {

                continue;
            }


            // Check tags
            let correctTag = false;

            for (let i = 0; i < event.tags.length; i++) {

                if (event.tags[i] === tag) {

                    correctTag = true;
                    break;
                }
            }

            if (!correctTag && tag !== "Any Event Locations") {

                continue;
            }

            // Add Event
            console.log(event);
            eventList.push(event);
        }

        return eventList;
    }

    // Kill Alerts
    deleteAlerts() {
        let alerts = document.getElementsByClassName("alert");

        while (alerts.length > 0) {

            alerts[0].remove();
        }
    }
}

document.addEventListener("DOMContentLoaded", function (event) {

    const eventLocations = [1, 2, 6, 7, 9, 12];

    const eventLocationsTags = [
        "spacious",
        "small",
        "outdoors",
        "indoors",
        "well lit"
    ]



    console.log(eventLocationsTags[1]);
    let searchPage = new SearchPage();
    searchPage.addEventLocations(eventLocations);
    searchPage.addEventTags(eventLocationsTags);

    let form = document.getElementById("inputForm");
    let eventList = [];

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        searchPage.deleteAlerts();

        // Delete existing articles
        let articles = document.getElementsByTagName("article");

        while (articles.length > 0) {

            articles[0].remove();
        }

        // Get user input
        let location = document.getElementById("where").value;
        console.log(location);
        let date = document.querySelector('input[type="date"]').value;
        console.log(date);
        let tag = document.getElementById("what").value;
        console.log(tag);

        // Fetch Events
        const response = await fetch(`/api/eventEvents`);

        if (!response.ok) {

            throw new Error(`Error occurred. Status: ${response.status}`);
        }

        const allEvents = await response.json();

        // Filter events
        eventList = searchPage.filterEvents(allEvents, location, date, tag);

        // Add 2 events
        let itemsCount = eventList.length < 2 ? eventList.length : 2;

        for (let i = 0; i < itemsCount; i++) {

            searchPage.addEventToDOM(eventList[0]);
            eventList.shift();
        }
        // searchPage.addEvents(eventList);

        // Scroll to results
        document.getElementById("results").scrollIntoView();
    })

    let loadMore = document.getElementById("loadMoreButton");

    loadMore.addEventListener("click", function (e){

        e.preventDefault();

        searchPage.deleteAlerts();
        console.log("Load More");
        let itemsCount = eventList.length < 2 ? eventList.length : 2;

        for (let i = 0; i < itemsCount; i++) {

            searchPage.addEventToDOM(eventList[0]);
            eventList.shift();
        }

        if (itemsCount <= 0) {

            let alertContainer = document.createElement("div");
            alertContainer.setAttribute("class", "alert alert-primary");
            alertContainer.setAttribute("role", "alert");
            alertContainer.append("There are no more Event Locations to load !");

            document.getElementById("loadMore").append(alertContainer);
            console.log("Help");
        }

        /*
        <div class="alert alert-warning" role="alert">
            This is a warning alert—check it out!
        </div
         */
    })
});