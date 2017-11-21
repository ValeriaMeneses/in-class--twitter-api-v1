const express = require('express');
const { Model } = require('objection');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const pageRouter = require('./src/routes/pageRouter.js');
const apiRouter = require('./src/routes/apiRouter.js');

const connectToDb = require('./src/database/dbConnect.js');
const dbConfigObj = require('./knexfile.js');

const app = express();

const appDb = connectToDb(dbConfigObj.development);

Model.knex(appDb);

app.locals.db = appDb;

// Configure EJS template engine
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/src/views`);

//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files
app.use(express.static(`${__dirname}/public`))

app.use('/', pageRouter);
app.use('/api/v1', apiRouter);

// Create 404 route
app.use((req, res) => {
  res.send('<h1>404. Not found.</h1>')
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

console.log(`App listening on port ${PORT}`)

});
