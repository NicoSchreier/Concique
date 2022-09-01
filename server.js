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
const port = process.env.PORT ?? 3000;
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

/*
This will render and serve the HTML form to the client to fill in the login credentials.
If user is already logged in, he will be redirected to the landing page.
*/
app.get('/',(req,res) => {
        res.sendFile(path.join(__dirname + '/files/index.html'));
});

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