const express = require('express')
const mysql = require('mysql')
var path =require('path')
var logger = require('morgan')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const { Client } = require('pg');

const PORT = process.env.PORT || 3000
const dbname = process.env.DATABASE_URL
// const DBPATH = process.env.DATABASE_URL || 'postgres://irjmfvxh:EAj3N4DcMuOt8QeZDpJtEufIytTbRN-F@elmer.db.elephantsql.com:5432/irjmfvxh'





const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

//Create Connection
// const db = mysql.createConnection({
//     host : 'ec2-107-20-237-78.compute-1.amazonaws.com',
//     user: 'junhvkycxagcdx',
//     password: '2c385abfd5643d2c66807224583fc5a01eff0b36c17d5a42f1abec3a9e327132',
//     database: dbname
// });

// db.connect((err) =>{
//     if(err)
//     {
//         throw(err)
//     }
//     console.log('connected');
// });
const app = express();


app.use(bodyParser({
    extended: true
}))



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err)throw(err);
        console.log(result);
        res.send('database created');
    });
});

//Create Table Post name
app.post('/createtableone', (req,res) => {
    let sql = 'CREATE TABLE tableone(id int AUTO_INCREMENT, name VARCHAR(255), primary key (id))';
    client.query('CREATE TABLE tableone(id int AUTO_INCREMENT, name VARCHAR(255), primary key (id))', (err, res) =>{
        if(err) throw(err);
        console.log(result);
        res.send('post table created');
    })
});


//Insert some data dynamic
app.get('/addname/:name',(req,res) => {
    let postname = {name : req.params.name};
    let sql = 'INSERT INTO tableone SET ?';
    let query= db.query(sql, postname, (err, result) =>
    {
        if(err) throw(err);
        console.log(result);
        res.send('name' + req.params.name+ 'added');
    })

});

//Select All
app.get('/all',(req,res) => {
    let sql = 'SELECT * FROM tableone';
    let query= db.query(sql, (err, results) =>
    {
        if(err) throw(err);
        console.log(results);
        // res.send('name' + req.params.name+ 'added');
        res.send("post fetched");
    })

});


//Select Single Post
app.get('/getone/:id',(req,res) => {
    // let sql = 'SELECT * FROM tableone WHERE id = ${req.params.id}';
    let sql = `SELECT * FROM tableone WHERE id = ${req.params.id}`;
    let query= db.query(sql, (err, result) =>
    {
        if(err) throw(err);
        console.log(result);
        // res.send('name' + req.params.name+ 'added');a
        res.send("fetched  " + req.params.id + "  ");
    })

});


//Update Post
app.get('/updateone/:id/:name',(req,res) => {
    let newname = {name: req.params.name};
    let sql = `UPDATE tableone SET name =  '${req.params.name}' WHERE id = ${req.params.id}`;
    let query= db.query(sql, (err, result) =>
    {
        if(err) throw(err);
        console.log(result);
        // res.send('name' + req.params.name+ 'added');a
        res.send("Updated  " + req.params.id + "  ");
    })

});


//Delete Post
app.get('/deleteone/:id',(req,res) => {
    let sql = `DELETE FROM tableone WHERE id = ${req.params.id}`;
    let query= db.query(sql, (err, result) =>
    {
        if(err) throw(err);
        console.log(result);
        // res.send('name' + req.params.name+ 'added');a
        res.send("Deleted  " + req.params.id + "  ");
    })

});

//route
app.get('/',(req,res) =>
{
    res.render('index');
});



app.listen(PORT, () => {
    console.log("Server Started on PORT " + PORT + " ...");
});