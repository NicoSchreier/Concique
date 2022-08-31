class Place {

}

class PlaceOfTheWeek{
    constructor(name, image, likes, views, id) {
        this.name = name;
        this.image = image;
        this.likes = likes;
        this.views = views;
        this.id = id;
    }
}

class ExplorePage {
    async addPlaceOfTheWeekToDOM(place){
        let divPOTW = document.createElement("div");
        divPOTW.setAttribute("class", "clubOfTheWeek");
        let centerDiv1 = document.createElement("div");
        centerDiv1.setAttribute("class", "center");
        let centerDiv2 = document.createElement("div");
        centerDiv2.setAttribute("class", "center");
        divPOTW.append(centerDiv1);
        let centerDiv3 = document.createElement("div");
        centerDiv3.setAttribute("class", "center");
        let centerDiv4 = document.createElement("div");
        centerDiv4.setAttribute("class", "center");

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ee0d812f91msh96ed092006da3b3p1ff48cjsn84643d796aa9--',
                'X-RapidAPI-Host': 'instagram-data1.p.rapidapi.com'
            }
        };

        //Fetches the follower count of the place of the week
        const response = await fetch('https://instagram-data1.p.rapidapi.com/followers?username=praterdomevienna', options)
        const likesJSON = await response.json();
        const likes = likesJSON['count'];

        let imgPOTW = document.createElement("img");
        imgPOTW.setAttribute("src", place.image);
        imgPOTW.className = "cotwIMG";
        centerDiv1.append(imgPOTW);

        divPOTW.append(centerDiv3);
        let iconBorder1 = document.createElement("div");
        iconBorder1.setAttribute("class", "iconBorder");
        centerDiv3.append(iconBorder1);

        let heart = document.createElement("ion-icon");
        heart.setAttribute("name", "heart");
        iconBorder1.append(heart);
        let likesValue = document.createElement("label");
        likesValue.setAttribute("class", "values");
        likesValue.append(likes);
        iconBorder1.append(likesValue);

        divPOTW.append(centerDiv4);
        let iconBorder2 = document.createElement("div");
        iconBorder2.setAttribute("class", "iconBorder");
        centerDiv4.append(iconBorder2);

        let eye = document.createElement("ion-icon");
        eye.setAttribute("name", "eye");
        iconBorder2.append(eye);
        let viewsValue = document.createElement("label");
        viewsValue.setAttribute("class", "values");
        viewsValue.append(place.views);
        iconBorder2.append(viewsValue);

        document.querySelector("#container").append(centerDiv2);

        let nameOfPOTW = document.querySelector("#nameOfCOTW")
        nameOfPOTW.append(place.name);

        document.querySelector("#center").append(divPOTW);
    }

    //Loads the date(s) and places to the DOM
    addToDOM(date, places) {
        this.addDateToDOM(date);

        for (const place of places){
            this.addPlaceToDOM(date, Object.assign(new Place(), place));
        }
    }

    //Adds a date to the DOM
    addDateToDOM(date){
        let newSection = document.createElement("section");
        newSection.setAttribute("id", date.id);
        newSection.setAttribute("class", "date");

        let newHeader = document.createElement("h3");
        newHeader.setAttribute("class", "dateText");
        newHeader.append(date.dateName)
        newSection.append(newHeader);

        document.getElementById("batches").append(newSection);
    }
    //Adds a place to the DOM
    addPlaceToDOM(date, place){
        let newPlace = document.createElement("article");
        newPlace.setAttribute("id", place.id);

        let centreDiv1 = document.createElement("div");
        centreDiv1.setAttribute("class", "center");
        let centreDiv2 = document.createElement("div");
        centreDiv2.setAttribute("class", "center");
        let centreDiv3 = document.createElement("div");
        centreDiv3.setAttribute("class", "center");
        let centreDiv4 = document.createElement("div");
        centreDiv4.setAttribute("class", "center");

        newPlace.append(centreDiv1);

        let clubIMG = document.createElement("img");
        clubIMG.setAttribute("src", place.image)
        clubIMG.setAttribute("class", "otherClubsImg");
        centreDiv1.append(clubIMG);

        newPlace.append(centreDiv2);
        let newLabel = document.createElement("label");
        newLabel.setAttribute("class", "articleText");
        newLabel.append(place.name);
        centreDiv2.append(newLabel);
        let arrow = document.createElement("div");
        arrow.setAttribute("class", "arrow");
        let circle = document.createElement("div");
        circle.setAttribute("class", "circle")
        circle.append(arrow);
        centreDiv2.append(circle);

        newPlace.append(centreDiv3);
        let iconBorder1 = document.createElement("div");
        iconBorder1.setAttribute("class", "iconBorder");
        centreDiv3.append(iconBorder1);

        let heart = document.createElement("ion-icon");
        heart.setAttribute("name", "heart");
        iconBorder1.append(heart);
        let likesValue = document.createElement("label");
        likesValue.setAttribute("class", "values");
        likesValue.append(place.likes);
        iconBorder1.append(likesValue);

        newPlace.append(centreDiv4);
        let iconBorder2 = document.createElement("div");
        iconBorder2.setAttribute("class", "iconBorder");
        centreDiv4.append(iconBorder2);

        let eye = document.createElement("ion-icon");
        eye.setAttribute("name", "eye");
        iconBorder2.append(eye);
        let viewsValue = document.createElement("label");
        viewsValue.setAttribute("class", "values");
        viewsValue.append(place.views);
        iconBorder2.append(viewsValue);

        document.getElementById(date.id).append(newPlace);
    }

}

document.addEventListener("DOMContentLoaded", async function () { //AJAX
    const explorePage = new ExplorePage();
    explorePage.addPlaceOfTheWeekToDOM(new PlaceOfTheWeek("Event Location 1", "images/landingpage_event.jpg", "", "30000", "1"))
    //Fetches the correct dates from the model
    const response = await fetch(`/api/event/dates/`);
    if (!response.ok) {
        //If the fetch fails and the promise fails. New error is thrown with the status code.
        throw new Error(`Fetch error, something went wrong. status: ${response.status}`);
    }
    //Response is treated as a .json file and is given to the const dates (which contains the dates now).
    const dates = await response.json();
    for (const date of Array.from(dates).reverse()) {
        //Fetches the places from the model
        const placesJSON = await fetch(`/api/event/dates/${date.dateNumber}/places`);
        //placesJSON is treated as a .json file and is given to the const places (which contains the places now).
        const places = await placesJSON.json();
        //The function addToDOM is called with the params set as the date (based on the for loop) and the places of that date.
        explorePage.addToDOM(date, places);
    }

});