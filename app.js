var createError = require('http-errors');
var express = require('express');
var Sequelize = require('sequelize');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const PORT = process.env.PORT || 3450;
const DBPATH = process.env.DATABASE_URL ||'postgres://irjmfvxh:EAj3N4DcMuOt8QeZDpJtEufIytTbRN-F@elmer.db.elephantsql.com:5432/irjmfvxh';


const sequelize = new Sequelize(DBPATH)

console.log("connected");


// TABLE 'user'
const User = sequelize.define('user', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
})

sequelize.sync()


//
// app.get('/', (req, res) => {
// //    res.sendFile(__dirname+"/index.html")
//      res.render('index')
// })
//


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



app.get('/create', (req, res) => {
    
    User.create({
        username: req.query.user,
        birthday: new Date()
    }).then((result)=>{
        
        res.send(true)
    })

})


app.get('/search', (req, res) => {
    User.findAll({}).then(users => res.send(users))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


app.listen(PORT, () => {
    console.info('App listening on port ' + PORT + '...')
})
