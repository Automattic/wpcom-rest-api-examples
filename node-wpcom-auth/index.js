/**
 * Module dependencies.
 */

var URL = require('url');
var express = require('express');
var WPOAuth = require('wpcom-oauth');
var session = require('express-session');

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
app.get('/dashboard', function(req, res) {
  if (!req.session.access_token) {
    return res.redirect('/');
  }
  var wpcom = require('wpcom')(req.session.access_token);
  wpcom.me().get(function(err, userInfo) {
    if (err) return res.render('error', err);
    res.render('dashboard', {
      user: userInfo,
      blog_id: req.session.blog_id,
      blog_url: req.session.blog_url
    });
  });
});

// Handle publishing post
app.post('/publish', express.urlencoded({ extended: true }), function(req, res) {
  if (!req.session.access_token) {
    return res.redirect('/');
  }
  var wpcom = require('wpcom')(req.session.access_token);
  var blogId = req.body.blog_id;
  var title = req.body.title;
  var content = req.body.content;
  wpcom.site(blogId).post({
    title: title,
    content: content
  }, function(err, post) {
    if (err) return res.render('error', err);
    res.render('dashboard', {
      user: null,
      blog_id: blogId,
      blog_url: req.session.blog_url,
      post: post
    });
  });
});

var port = settings.port || 3001;
app.listen(port);
console.log('WPOAuth app started on http://localhost:%d', port);
