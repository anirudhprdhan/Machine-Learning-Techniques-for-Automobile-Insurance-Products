const express =require('express');
const fs= require('fs');
// const { toUSVString } = require('util');
const morgan = require('morgan');
const app =express();

app.use(express.json()); //middleware
app.use(morgan('dev'));
const port=3000;
const bodyParser = require('body-parser'); //middleware


// Defining the routers
const login_router = require('./routes/login');
const create_router = require('./routes/create');
const delete_router = require('./routes/delet');
const update_router = require('./routes/update_user');
const pass_router = require('./routes/update_pass');

app.use(bodyParser.urlencoded({extended: false}));

const users =JSON.parse(
    fs.readFileSync(`${__dirname}/data/users.json`)
);

// funciton to get all the users
const getAllUsers =(req,res)=>{
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
};

//function to get user with a particular id from the array of users
const getUser=(req,res)=>{
    
    console.log(req.params);

    const id= req.params.id *1 ;
    const user = users.find(el => el.id ===id);
    if (id ===0 || user == null){
        return res.status(404).json({
            status:'failed',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
};

// Getting the full list of the users from the json file
app.get('/api/v1/users',getAllUsers);

// Getting the particular user from the json file with a particular id 
app.get('/api/v1/users/:id',getUser);

// getting the homepage
const homepage=(req,res)=>{
    res.sendFile(__dirname+'/routes/static/index.html');
};


app.get('/',homepage);
app.use('/login',login_router);
app.use('/create-user',create_router);
app.use('/delete-user',delete_router);
app.use('/update-user',update_router);
app.use('/update-pass',pass_router);


app.listen(port ,()=>{
    console.log(`app running on port ${port}...`)
});