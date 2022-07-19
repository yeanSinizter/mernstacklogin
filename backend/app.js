require('dotenv').config();
require('./config/database').connect();


const express = require('express');
const User = require('./model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');
const auth = require('./middleware/auth');
const cors = require('cors')


const app = express();

app.use(express.json());
app.use(cors())


app.post("/register" , async (req , res) =>{
    //register logic
    try{

        //get user input
        const{ first_name ,last_name, email, pasword }= req.body;

        //validate user input 
        if(!(email && pasword && first_name && last_name)){
            res.status(400).send('All input is required');
        }

        //check if user already exist

        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.status(409).send('User already exist.Please login');

        }

        //encypt user password
        encrytedPassword = await bcrypt.hash(pasword, 10 );

        //create user in our database

        const user = await User.create({
            first_name,
            last_name,
            email:email.toLowerCase(),
            password: encrytedPassword
        });

        const token = jwt.sign(
            {user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn:'2h'
            }
        )

        //save user token

        user.token = token;

        //return new user
        res.status(201).json(user);




    }catch(err){
        console.log(err);

    }

    

});


app.post("/login" , async (req , res) =>{
     //login logic

    try{
        //get user input
        const {email, password} = req.body;

        //validate 
        if(!(email && password)){
            res.status(400).send('All in put is required');

        }
        //validate if user exist in our database
        const user = await User.findOne({email});

        if(user &&(await bcrypt.compare(password,user.password))){
            //create token
            const token = jwt.sign(
                {user_id:user._id,email },
                process.env.TOKEN_KEY,
                {
                    expiresIn:'2hr'
                }
            )
              //save token
        user.token = token;
        res.status(200).json(user);
        }
        res.status(400).send("Invalid")

      


    }catch(err){
        console.log(err)

    }
   

});

app.post('/Wellcome', auth, (req, res) =>{
    res.status(200).send('Wellcome')
})







module.exports = app;
