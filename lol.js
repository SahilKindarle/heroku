const express = require('express')
const Sequelize = require('sequelize')
// var path = require('path')
// var cookieParser = require('cookie-parser')
// var logger = require('morgan')


var app = express()

const PORT = process.env.PORT || 4040
const DBPATH = process.env.DATABASE_URL || 'postgres://irjmfvxh:EAj3N4DcMuOt8QeZDpJtEufIytTbRN-F@elmer.db.elephantsql.com:5432/irjmfvxh'



const sequelize = new Sequelize(DBPATH)

// TABLE 'user'
const User = sequelize.define('user', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
})

sequelize.sync()


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
    // res.render('index')
})


app.get('/create', (req, res) => {

    User.create({
        username: req.query.user,
        birthday: new Date()
    }).then((result) => {

        res.send(true)
    })

})


app.get('/search', (req, res) => {
    User.findAll({}).then(users => res.send(users))
})



// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({
//     extended: false
// }));

// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// error handler
app.use(function (err, req, res, next) {
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