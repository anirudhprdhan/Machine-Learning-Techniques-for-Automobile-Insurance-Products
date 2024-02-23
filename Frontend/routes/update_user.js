const express= require('express')
const fs= require('fs');

const router = express.Router();


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

const g_update=(req,res)=>{
    res.sendFile(__dirname+'/static/update_user.html');
};

const updateUser=(req,res)=>{
    console.log(req.params)
    console.log(req.body.username);

    let ousername =req.body.username;
    let opassword=req.body.password;
    let orepassword=req.body.repassword;

    let idsByName = users.find(a => a.username===ousername && a.password === opassword)
    let updated_user = {"id":idsByName.id,
                        "username":ousername,
                        "first_name":req.body.first_name,
                        "last_name":req.body.last_name,
                        "password":opassword,
                        "repassword":opassword,
                        "unique_id":idsByName.unique_id}
    
    let i = undefined_test(idsByName);
    if (i==0){
        res.status(404).sendFile(__dirname+'/static/update_user.html')
    }
    
    else if(opassword === idsByName.password && opassword === orepassword && orepassword===idsByName.repassword){    
        users.splice(users.indexOf(idsByName),1,updated_user);
        fs.writeFile(`${__dirname}./../data/users.json`,JSON.stringify(users),err=>{
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

router
    .route('/')
    .get(g_update)
    .post(updateUser);

module.exports=router;