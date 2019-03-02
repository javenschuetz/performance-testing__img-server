'use strict';

// libraries (alphabetic)
const bcrypt = require('bcryptjs'); // cryptographic hashing algorithm for passwords
const body_parser = require('body-parser'); // to give us access to body of http (post) requests
const client_sessions = require('client-sessions'); // mozilla library to implement encrypted client-side sessions
const express = require('express');



// ****************************************************************** some setup
const app = express();
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`); // says 'our ejs is here'
// says 'our static files live here', ie, most image files we will serve
app.use('/static', express.static(`${__dirname}/static`));



// ****************************************************************** middleware
// if a http request has a 'body,' this will add it to our request object
app.use(body_parser.urlencoded({
    extended: false
}));

// set up client-side sessions
app.use(client_sessions({
    cookieName: 'session',
    secret: process.env.SESSION_SECRET, // basically a symmetric encryption key
    duration: 1000 * 60 * 30, // 30 minutes
    activeDuration: 1000 * 60 * 5,
    cookie: {
        path: '/',
        httpOnly: true,
        sameSite: true,
        secureProxy: !process.env.IS_DEV, // only relevant for https
        ephemeral: true
    }
}));

// if user has an active session, attach a 'user' object to the request object
app.use((req, res, next) => {
    // if session does not exist, it was not found above by client_sessions.
    if (!req.session) {
        return next();
    } else {
        // simulate adding user data to the request object. Just a stub
        req.user = 'timmay';
        return next();
    }
});

// used in routes requiring login: if not logged in, redirect to /login
function login_required(req, res, next) {
    // since a real sesion has a user_id attached at login time, this verifies login
    if (!req.session.user_id) return res.redirect('/login');
    return next();
}



// ********************************************************************** routes
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    // simulate a password hash performed at login time.
    // note: does not actually compare passwords
    !bcrypt.compareSync(req.body.password, 'password');
    // client-sessions created a session, this adds some user data to it
    req.session.user_id = 123;
    return res.redirect('/dashboard');
});

// mostly to reset state between fake user sessions
app.get('/logout', (req, res) => {
    req.session.reset();
    res.clearCookie("session");
    res.redirect('/');
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
