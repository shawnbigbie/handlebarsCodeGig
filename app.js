const express = require('express');
const handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');

// Test DB
db.authenticate()
  .then(() => console.log('Database Connected'))
  .catch(err => console.log('Error: ' + err))

const app = express();

// Handlebars
app.engine('handlebars', exphbs({ 
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(handlebars)
 }));
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app. use(express.static(path.join(__dirname, './public')));

// Index rote
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// Gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server sarted on port ${PORT}`));