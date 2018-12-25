const express = require('express')
const Sequelize = require('sequelize')

var app = express()

const PORT = process.env.PORT || 3000
const DBPATH = process.env.DATABASE_URL ||'postgres://irjmfvxh:EAj3N4DcMuOt8QeZDpJtEufIytTbRN-F@elmer.db.elephantsql.com:5432/irjmfvxh'



const sequelize = new Sequelize(DBPATH)

// TABLE 'user'
const User = sequelize.define('user', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
})

sequelize.sync()


app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html")
    // res.render('index')
})


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


app.listen(PORT, () => {
    console.info('App listening on port ' + PORT + '...')
})