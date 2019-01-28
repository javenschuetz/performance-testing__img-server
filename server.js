'use strict';

// libraries (alphabetic)
const bcrypt = require('bcryptjs');                 // cryptographic hashing algorithm for passwords
const body_parser = require('body-parser');         // to give us access to body of http requests
const client_sessions = require('client-sessions'); // mozilla library to implement encrypted client-side sessions
const express = require('express');



// ****************************************************************** some setup
const app = express();
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);          // says 'our ejs is here'
app.use('/static', express.static(`${__dirname}/static`));  // sort of automatic route handling for this directory



// ****************************************************************** middleware
// to get request bodies in object form
app.use(body_parser.urlencoded({
    extended: false
}));

// set up client-side sessions
app.use(client_sessions({
    cookieName: 'session',
    secret: process.env.SESSION_SECRET,    // basically a symmetric encryption key
    duration: 1000 * 60 * 30,               // 30 minutes
    activeDuration: 1000 * 60 * 5,
    cookie: {
        path: '/',
        httpOnly: true,
        sameSite: true,
        secureProxy: !process.env.IS_DEV,
        ephemeral: true
    }
}));

// lookup user ahead of time, must be after client_sessions
app.use((req, res, next) => {
    // if session does not exist, it was not found above by client_sessions.
    if (!req.session) {
        return next();
    } else {
        // typical step to put some user info on the request object. Stubbed out.
        req.user = 'timmay';
        return next();
    }
});

// confirms that login was verified above
function login_required(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }

    return next();
}



// ********************************************************************** routes
app.get('/login', (req, res) => {
    req.session.user_id = 123;
    res.render('login');
});

app.post('/login', (req, res) => {
    !bcrypt.compareSync(req.body.password, 'password');
    return res.redirect('/dashboard');
});

app.get('/dashboard', login_required, (req, res) => {
    res.render('dashboard');
});

app.get('/', (req, res) => {
    res.render('index');
});

// Catch-all
app.get('*', (req, res) => {
    res.redirect('/');
});



// ************************************************************** error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something broke :( Please try again.");
});



// *********************************************************************** serve
// server listens on port X where Nginx is configured to forward requests to
const port = process.env.SERVER_PORT || 9000;
app.listen(port);
