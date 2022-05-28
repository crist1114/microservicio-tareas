const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const tasksRoutes = require('./routes/tasks');
const cors = require('cors')

const app = express();
app.set('port', 3002);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, 	X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-	Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, 	DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            // Dirección desde donde se pueden hacer peticiones
            if (!["http://localhost:4200"].includes(origin)) {
                return callback(new Error(`La política CORS para el origen ${origin} no permiten el acceso al servidor.`), false);
            }
            return callback(null, true);
        }
    })
);

app.use(myconnection(mysql, {
  host: 'sql10.freesqldatabase.com',
  user: 'sql10494398',
  password: 'TGTkfVV4i6',
  port: 3306,
  database: 'sql10494398'
}, 'single'));

app.listen(app.get('port'), () => {
  console.log('Listening on port ', app.get('port'));
});

app.use('/', tasksRoutes);

app.get('/', (req, res) => {
  res.render('home');
});