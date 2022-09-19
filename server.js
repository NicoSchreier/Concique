const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

//We create our routes
const clubRouter = require('./api/routes/club-routes');
const barRouter = require('./api/routes/bar-routes');
const eventRouter = require('./api/routes/event-routes');
const searchClubRouter = require('./api/routes/searchClub-routes');
const searchBarRouter = require('./api/routes/searchBar-routes');
const searchEventRouter = require('./api/routes/searchEvent-routes');
//We use express a web application framework - test
const app = express();
//Select our port 3000
const port = process.env.PORT ?? 4000;
//Where our static files are located
app.use(express.static(path.join(__dirname, '/files')));

app.use(bodyParser.urlencoded({ extended: true }));
//bodyParser parses the incoming requests bodies in a middleware (json) before it's handled
app.use(bodyParser.json());
app.use('/api', clubRouter);
app.use('/api', barRouter);
app.use('/api', eventRouter);
app.use('/api', searchClubRouter);
app.use('/api', searchBarRouter);
app.use('/api', searchEventRouter);

/*Session Management*/

const cookieParser = require("cookie-parser");
const sessions = require('express-session');

// creating 24 hours from milliseconds, sets the cookie expiry time
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecretkey", //a random unique string key used to authenticate a session
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware so server can access the necessary option to save, read and access a cookie.
app.use(cookieParser());

//in a production environment, these credentials are usually saved in a database.
let username = 'admin'
let password = 'ConciqueHype'

// a variable to save a session
let session;

/*
This will render and serve the HTML form to the client to fill in the login credentials.
If user is already logged in, he will be redirected to the landing page.
*/
app.get('/',(req,res) => {
    session = req.session;
    if(session.userid){ //user is already logged in
        res.sendFile(path.join(__dirname + '/files/landingpage.html'));
    } else
        res.sendFile(path.join(__dirname + '/files/login.html'))
});

/*
To create a session, the user will submit the credentials.
The server will verify these credentials received in the request’s body with the username and the password for the existing user.
*/
app.post('/user',(req,res) => {
    if(req.body.username === username && req.body.password === password){
        //if credentials are valid, user will be granted necessary access

        session = req.session;
        //The server will create a temporary user session with a random string
        //known as a session ID to identify that session.
        //Server will send a cookie to the client’s browser.
        //The session ID is going to be placed inside this cookie.

        session.userid = req.body.username;
        console.log(req.session)
        console.log("SessionID: " + req.session.id);
        res.sendFile(path.join(__dirname + '/files/landingpage.html'));
    }
    else {
        //if credentials invalid, no session will be initialized & this message will be sent:
        res.send('Invalid username or password');
    }
})
/*
When a client sends a request, the server will set a session ID and set the cookie equal to that session ID.
The cookie is then stored in the set cookie HTTP header in the browser.
Every time the browser (client) refreshes, the stored cookie will be a part of that request.
*/

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server listening at http://localhost:${port}`)
    }
});