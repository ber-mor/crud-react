const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: ''
})

db.connect(error => {
    if (error) throw error;
    console.log("Database connected");
});

app.post('/new', (req, res) => { 
    values = {
        name: req.body.name,
        age: req.body.age,
        country: req.body.country,
        position: req.body.position,
        wage: req.body.wage
    }
    
    const sql = "INSERT INTO employee SET ?"
    db.query(sql, values, (error,result) => {
        if (error) throw error
        res.send(result)
    })
})

app.get('/get', (req, res) => {
    const sql = "SELECT * FROM employee"
    db.query(sql, (error, result) => {
        if (error) throw error
        res.send(result)
    })
})

app.put('/update', (req, res) => {
    const id = req.body.id
    const wage = req.body.wage
    const sql = "UPDATE employee SET wage = ? WHERE id = ?"
    db.query(sql, [wage, id], (error, result) => {
        if (error) throw error 
        res.send(result)
    })
})

app.delete('/delete/:id', (req,res)=>{
    const id = req.params.id
    const sql = 'DELETE FROM employee WHERE id = ?'
    db.query(sql, id, (error,result)=>{
        if (error) throw error
        res.send(result)
    })
})

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`)
})

