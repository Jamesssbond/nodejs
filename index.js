const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3307',
    user: 'ball',
    password: 'ball',
    database: 'javatest'
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting', err);
        return;
    }
    console.log('MySQL connected');
});


app.get("/users",(req,res) =>{
    db.query("SELECT * FROM users",(err, results) =>{
        if (err){
            console.log(err);
        }else{
            res.send(results);
            
        }
    });
});

app.post("/addusers",(req,res) =>{
        const email = req.body.email;
        const fullname = req.body.fullname;
        const password = req.body.password;
        db.query("INSERT INTO users(email, fullname, password) VALUES(?,?,?)",
        [email,fullname,password],
        (err, results) =>{
            if (err){
                console.log(err);
            }else{
                res.send("VALUE inserted");
            }
        });

});

app.put("/updateusers",(req,res)=>{
    const id =req.body.id;
    const password =req.body.password;

    db.query("UPDATE users SET password = ? WHERE id = ?",[password,id],(err, results) =>{
        if (err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
})

app.delete("/delete/:id",(req,res)=>{
    const id =req.params.id;
    db.query("DELETE FROM users WHERE id = ?",id,(err, results) =>{
        if (err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
})

app.listen(3001, () => console.log('Server is running on port 3001'));