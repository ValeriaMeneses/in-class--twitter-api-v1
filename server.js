const express = require('express');
const { Model } = require('objection');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const pageRouter = require('./src/routes/pageRouter.js');
const apiRouter = require('./src/routes/apiRouter.js');
const authRouter = require('./src/routes/authRouter.js');

const connectToDb = require('./src/database/dbConnect.js');
const dbConfigObj = require('./knexfile.js');

// Import the libraries + middleware
const passport = require('passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

const registerLocalStrategy = require('./src/middleware/passport-local--registerLocalStrategy.js');
const { configDeserializeUser, configSerializeUser } = require('./src/helpers/passport-local--sessionActions.js');

const app = express();

const appDb = connectToDb(dbConfigObj.development);

Model.knex(appDb);

app.locals.db = appDb;

// Configure EJS template engine
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/src/views`);

//// JSON parse configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cookieParser, cookieSession configuration
app.use(cookieParser());
app.use(cookieSession({
  name: 'cookiemonster',
  secret: 'superduperhipersecret',
  httpOnly: true,
  signed: false
}));

//passport middleware configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(registerLocalStrategy());
passport.serializeUser(configSerializeUser());
passport.deserializeUser(configDeserializeUser());

// Static files
app.use(express.static(`${__dirname}/public`))

app.use('/', pageRouter);
app.use('/api/v1', apiRouter);
app.use('/auth', authRouter);

// Create 404 route
app.use((req, res) => {
  res.send('<h1>404. Not found.</h1>')
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

console.log(`App listening on port ${PORT}`)

});
