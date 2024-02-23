const express= require('express')
const fs= require('fs');

const login_router=express.Router();


const users =JSON.parse(
    fs.readFileSync(`${__dirname}/../data/users.json`)
);

function undefined_test(t){
    if (t===undefined){
        return 0;
    }
    else {
        return 1;
    }
}

const glogin=(req,res)=>{
    res.sendFile(__dirname+'/static/login.html');
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
login_router
    .route('/')
    .get(glogin)
    .post(login);

module.exports=login_router;