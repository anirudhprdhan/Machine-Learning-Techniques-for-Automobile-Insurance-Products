const express =require('express');
const fs= require('fs');
// const { toUSVString } = require('util');

const app =express();

app.use(express.json()); //middleware
const port=3000;
const bodyParser = require('body-parser'); //middleware
app.use(bodyParser.urlencoded({extended: false}));

// app.get('/hi', (req,res)=>{
//     res.status(200).send('Hi you are in the app');
// });

// app.post('/',(req,res)=>{
//     res.send('you can post here');
// });

const users =JSON.parse(
    fs.readFileSync(`${__dirname}/data/users.json`)
);
var user={};

function undefined_test(t){
    if (t===undefined){
        return 0;
    }
    else {
        return 1;
    }
}
// const idsByName = Object.fromEntries(users.map(({ username, id }) => [username, id]));

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

const postUser =(req,res)=>{
    // res.status(200)
    // console.log(req.body);
    console.log(req.params);
    const newId = users[users.length-1].id + 1;
    const newuId = users[users.length-1].unique_id + 1;

    let password=req.body.password;
    let repassword=req.body.repassword;
    if (password !== repassword){
        // res.send('passwords do not match');
        res.sendFile(__dirname+'/static/newuser.html');
        return 0;
    }

    const newUser =Object.assign({id: newId},req.body,{unique_id : newuId});                        

    users.push(newUser);
    

    fs.writeFile(`${__dirname}/data/users.json`,JSON.stringify(users),err=>{
        res.status(201).json({
            status: 'success',
            data:{
                user: newUser
            }
        });
    });
};

//delete a particular user from the array of users
const deleteUser=(req,res)=>{
    console.log(req.params);
    
    let username =req.body.username;
    let password=req.body.password;
    let repassword=req.body.repassword;

    let idsByName = users.find(a => a.username===username )
    let i = undefined_test(idsByName);
    if (i==0){
        res.status(404).sendFile(__dirname+'/static/delete-user.html')
    }
    else if(password === idsByName.password && repassword===idsByName.repassword){
        users.splice(users.indexOf(idsByName),1);

        fs.writeFile(`${__dirname}/data/users.json`,JSON.stringify(users),err=>{
            res.status(200).json({
                status:'successfully deleted data of',
                data:{
                    idsByName
                }
            });
        });
    }
    else{
        res.sendFile(__dirname+'/static/delete-user.html');
    };
};
const updateUser=(req,res)=>{
    console.log(req.params)
    console.log(req.body.username);

    let ousername =req.body.username;
    let opassword=req.body.password;
    let orepassword=req.body.repassword;

    let idsByName = users.find(a => a.username===ousername )
    let updated_user = {"id":idsByName.id,"username":ousername,"first_name":req.body.first_name,"last_name":req.body.last_name,"password":opassword,"repassword":opassword,"unique_id":idsByName.unique_id}
    
    let i = undefined_test(idsByName);
    if (i==0){
        res.status(404).sendFile(__dirname+'/static/update_user.html')
    }
    
    else if(opassword === idsByName.password && opassword === orepassword && orepassword===idsByName.repassword){    
        users.splice(users.indexOf(idsByName),1,updated_user);
        fs.writeFile(`${__dirname}/data/users.json`,JSON.stringify(users),err=>{
            res.status(200).json({
                status:'successfully updated data',
                data:{
                    idsByName,
                    updated_user

                }
            });
        });
    }
    else{
        res.sendFile(__dirname+'/static/update_user.html');
    };

};

const updatePass=(req,res)=>{
    console.log(req.params)
    console.log(req.body.username);

    let ousername =req.body.username;
    let opassword=req.body.password;
    let orepassword=req.body.repassword;
    

    let idsByName = users.find(a => a.username===ousername )
    let updated_user = {"id":idsByName.id,"username":ousername,"first_name":idsByName.first_name,"last_name":idsByName.last_name,"password":req.body.npassword,"repassword":req.body.npassword,"unique_id":idsByName.unique_id}
    
    let i = undefined_test(idsByName);
    if (i==0){
        res.status(404).sendFile(__dirname+'/static/update_pass.html')
    }
    
    else if(opassword === idsByName.password && opassword === orepassword && orepassword===idsByName.repassword && req.body.npassword === req.body.nrepassword){    
        users.splice(users.indexOf(idsByName),1,updated_user);
        fs.writeFile(`${__dirname}/data/users.json`,JSON.stringify(users),err=>{
            res.status(200).json({
                status:'successfully updated data',
                data:{
                    idsByName,
                    updated_user

                }
            });
        });
        user=updated_user;
        // console.log(user);
    }
    else{
        res.sendFile(__dirname+'/static/update_pass.html');
    };

};

const login=(req,res)=>{
    let username =req.body.username;
    let password=req.body.password;

    let idsByName = users.find(a => a.username===username )
    let i = undefined_test(idsByName);
    if (i==0){
        res.status(404).sendFile(__dirname+'/static/login.html')
    }
    else if(i!=0 && idsByName.password === password){
        res.status(200).send({
            status: 'Success',
            data:{
                idsByName
            }
        });
        user=idsByName;
        // console.log(user);
    }
    else{
        res.status(422).send({
            status:'username or password wrong enter again'
        })
    }
}
// getting the homepage
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/static/index.html');
});

// getting the login page
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/static/login.html');
});

app.get('/create-user',(req,res)=>{
    res.sendFile(__dirname+'/static/newuser.html');
});

// getting the details filled by the user to login
app.post('/login',login);

app.get('/update-user',(req,res)=>{
    res.sendFile(__dirname+'/static/update_user.html');
});

app.get('/update-pass',(req,res)=>{
    res.sendFile(__dirname+'/static/update_pass.html');
});
// Psting data i.e. creating a new user in the user json file
app.post('/create-user',postUser);


// deletes one user whose id is a match
 app.get('/delete-user',(req,res)=>{
     res.sendFile(__dirname+'/static/delete-user.html');
});

app.post('/delete-user',deleteUser);
app.post('/update-user',updateUser);
app.post('/update-pass',updatePass);

// Getting the full list of the users from the json file
app.get('/api/v1/users',getAllUsers);

// Getting the particular user from the json file with a particular id 
app.get('/api/v1/users/:id',getUser);

app.get('/select-state',(req,res)=>{
    // console.log(user);
    res.sendFile(__dirname+'/static/select-state.html');
    
});

app.post('/select-state',(req,res)=>{
    // console.log(req.body.state);
    user["state"]=req.body.state;
    res.send(user);
})
app.listen(port ,()=>{
    console.log(`app running on port ${port}...`)
});