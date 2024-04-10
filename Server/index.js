const express = require ('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/Login')

const UserSchema = new mongoose.Schema({
    email:String,
    password: String
})

const UserModel = mongoose.model("users", UserSchema)

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Login Successfully")
            } else{
                res.json("The Password is Incorrect")
            }
        } else{
            res.json("No Record is existed")
        }
    })
})

app.listen(3001, () =>{
    console.log("Server is Running");
})