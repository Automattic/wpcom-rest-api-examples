/**
 * Module dependencies.
 */

var URL = require('url');
var express = require('express');
var WPOAuth = require('wpcom-oauth');
var session = require('express-session');
const fetch = require('node-fetch');

/**
 * Get settings data
 */

var settings = require('./settings.json');

/**
 * Create a WPOAuth instance
 */

var wpoauth = WPOAuth(settings);

var pub = __dirname + '/public';
var app = express();
app.use(express.static(pub));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

console.log('Loaded settings:', settings);

// homepage route
app.get('/', function(req, res){
  res.render('home', {
    settings: settings,
    url: wpoauth.urlToConnect()
  });
});

var redirectPath = URL.parse(wpoauth.opts.url.redirect).pathname;

// connect response route
// grab code query param
app.get(redirectPath, function(req, res){
  var code = req.query.code;
  res.render('ready', { code: code });
});

// access token route
app.get('/get_token/:code', function(req, res){
  // pass the code into settings parameters
  wpoauth.code(req.params.code);

  // request access token
  wpoauth.requestAccessToken(function(err, data){
    if (err) return res.render('error', err);
    req.session.access_token = data.access_token;
    req.session.token_type = data.token_type;
    req.session.blog_id = data.blog_id;
    req.session.blog_url = data.blog_url;
    req.session.scope = data.scope;
    res.render('ok', data);
  });
});

// Dashboard route for user info and publishing
app.get('/dashboard', async function(req, res) {
  if (!req.session.access_token) {
    console.log('No access token in session');
    return res.redirect('/');
  }
  try {
    console.log('Fetching user info with token:', req.session.access_token);
    const response = await fetch('https://public-api.wordpress.com/rest/v1.1/me', {
      headers: {
        'Authorization': `Bearer ${req.session.access_token}`
      }
    });
    console.log('API response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      let errorObj;
      try {
        errorObj = JSON.parse(errorText);
      } catch (e) {
        errorObj = { error: 'API Error', description: errorText };
      }
      // Ensure error and description fields exist
      if (!errorObj.error) errorObj.error = 'API Error';
      if (!errorObj.description) errorObj.description = errorText;
      return res.render('error', errorObj);
    }
    const userInfo = await response.json();
    res.render('dashboard', {
      user: userInfo,
      blog_id: req.session.blog_id,
      blog_url: req.session.blog_url
    });
  } catch (err) {
    console.error('Exception in /dashboard:', err);
    res.render('error', { error: 'Exception', description: err.message });
  }
});

// Handle publishing post
app.post('/publish', express.urlencoded({ extended: true }), async function(req, res) {
  if (!req.session.access_token) {
    return res.redirect('/');
  }
  const blogId = req.body.blog_id;
  const title = req.body.title;
  const content = req.body.content;
  try {
    const response = await fetch(`https://public-api.wordpress.com/rest/v1.1/sites/${blogId}/posts/new/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${req.session.access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        title,
        content
      })
    });
    if (!response.ok) {
      const error = await response.json();
      return res.render('error', error);
    }
    const post = await response.json();
    res.render('dashboard', {
      user: null,
      blog_id: blogId,
      blog_url: req.session.blog_url,
      post: post
    });
  } catch (err) {
    res.render('error', { message: err.message });
  }
});

var port = settings.port || 3001;
app.listen(port);
console.log('WPOAuth app started on http://localhost:%d', port);
