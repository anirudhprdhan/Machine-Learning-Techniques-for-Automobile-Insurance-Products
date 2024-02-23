const express= require('express')
const fs= require('fs');
const router = express.Router();


const users =JSON.parse(
    fs.readFileSync(`${__dirname}/../data/users.json`)
);

const gdeleteUser=(req,res)=>{
    res.sendFile(__dirname+'/static/delete-user.html');
};

function undefined_test(t){
    if (t===undefined){
        return 0;
    }
    else {
        return 1;
    }
}

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

        fs.writeFile(`${__dirname}./../data/users.json`,JSON.stringify(users),err=>{
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


router
    .route('/')
    .get(gdeleteUser)
    .post(deleteUser);

module.exports = router;