
/*
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c945ed4b82msh07925460817f53ep144424jsnc53067c257bc',
        'X-RapidAPI-Host': 'instagram-data1.p.rapidapi.com'
    }
};

fetch('https://instagram-data1.p.rapidapi.com/followers?username=valloho', options)
    .then(response => response.json())
    .then(response => console.log(response['count']))
    .catch(err => console.error(err));
 */

function mouseOverBar() {
    document.getElementById("cLogoBar").style.opacity = "1";
    document.getElementById("barText").style.opacity = "1";
    document.getElementById("barImg").style.transform = "scale(1.25)";
    document.getElementById("barImg").style.filter = "grayscale(0%)";
}

function mouseOutBar() {
    document.getElementById("cLogoBar").style.opacity = "0";
    document.getElementById("barText").style.opacity = "0"
    document.getElementById("barImg").style.transform = "scale(1)";
    document.getElementById("barImg").style.filter = "grayscale(100%)";
}

function mouseOverClub() {
    document.getElementById("cLogoClub").style.opacity = "1";
    document.getElementById("clubText").style.opacity = "1";
    document.getElementById("clubImg").style.transform = "scale(1.25)";
    document.getElementById("clubImg").style.filter = "grayscale(0%)";
}

function mouseOutClub() {
    document.getElementById("cLogoClub").style.opacity = "0";
    document.getElementById("clubText").style.opacity = "0";
    document.getElementById("clubImg").style.transform = "scale(1)";
    document.getElementById("clubImg").style.filter = "grayscale(100%)";
}
function mouseOverEvent() {
    document.getElementById("cLogoEvent").style.opacity = "1";
    document.getElementById("eventText").style.opacity = "1";
    document.getElementById("eventImg").style.transform = "scale(1.25)";
    document.getElementById("eventImg").style.filter = "grayscale(50%)";
}

function mouseOutEvent() {
    document.getElementById("cLogoEvent").style.opacity = "0";
    document.getElementById("eventText").style.opacity = "0";
    document.getElementById("eventImg").style.transform = "scale(1)";
    document.getElementById("eventImg").style.filter = "grayscale(100%)";
}