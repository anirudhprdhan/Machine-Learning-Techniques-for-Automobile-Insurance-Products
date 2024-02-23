const express= require('express')
const fs= require('fs');
const router = express.Router();

const users =JSON.parse(
    fs.readFileSync(`${__dirname}/../data/users.json`)
);


const createuser=(req,res)=>{
    res.sendFile(__dirname+'/static/newuser.html');
};
var user={};
const postUser =(req,res)=>{

    console.log(req.params);
    const newId = users[users.length-1].id + 1;
    const newuId = users[users.length-1].unique_id + 1;

    let password=req.body.password;
    let repassword=req.body.repassword;
    if (password !== repassword){
        res.sendFile(__dirname+'/static/newuser.html');
        return 0;
    }

    const newUser =Object.assign({id: newId},req.body,{unique_id : newuId});                        

    users.push(newUser);
    user=newUser;

    fs.writeFile(`${__dirname}/data/users.json`,JSON.stringify(users),err=>{
        res.status(201)
            .sendFile(__dirname+'/static/select_state.html');
            // .json({
            //     status: 'success',
            //     data:{
            //         user: newUser
            //     }
            // })
    });
};


const postState=(req,res)=>{
    // console.log(req.body.state);
    user["state"]=req.body.state;
    console.log(user)
    res.status(201)
        .sendFile(__dirname+'/static/select_company.html');
};
const postCompany=(req,res)=>{
    user["company"]=req.body.company;
    switch(req.body.company){
        case 'Ashok Leyland':
            path = '/static/cars/Ashok Leyland.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Aston Martin':
            path = '/static/cars/Aston Martin.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Audi':
            path = '/static/cars/Audi.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Bentley':
            path = '/static/cars/Bentley.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'BMW':
            path = '/static/cars/BMW.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Bugatti':
            path = '/static/cars/Bugatti.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Caterham':
            path = '/static/cars/Caterham.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Chevrolet':
            path = '/static/cars/Chevrolet.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Daewoo':
            path = '/static/cars/Daewoo.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Datsun':
            path = '/static/cars/Datsun.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'DC':
            path = '/static/cars/DC.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Eicher Polaris':
            path = '/static/cars/Eicher Polaris.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Ferrari':
            path = '/static/cars/Ferrari.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Fiat':
            path = '/static/cars/Fiat.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Force Motors':
            path = '/static/cars/Force Motors.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Ford':
            path = '/static/cars/Ford.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Hindustan Motors':
            path = '/static/cars/Hindustan Motors.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Honda':
            path = '/static/cars/Honda.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Hyundai':
            path = '/static/cars/Hyundai.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Fe':
            path = '/static/cars/Fe.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'ICML':
            path = '/static/cars/ICML.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Isuzu':
            path = '/static/cars/Isuzu.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Jaguar':
            path = '/static/cars/Jaguar.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Jeep':
            path = '/static/cars/Jeep.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Kia':
            path = '/static/cars/Kia.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Lamborghini':
            path = '/static/cars/Lamborghini.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Land Rover':
            path = '/static/cars/Land Rover.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Lexus':
            path = '/static/cars/Lexus.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Mahindra':
            path = '/static/cars/Mahindra.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Mahindra-Renault':
            path = '/static/cars/Mahindra-Renault.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Maini':
            path = '/static/cars/Maini.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Maruti Suzuki':
            path = '/static/cars/Maruti Suzuki.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Maserati':
            path = '/static/cars/Maserati.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Maybach':
            path = '/static/cars/Maybach.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Mercedes-Benz':
            path = '/static/cars/Mercedes-Benz.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'MG':
            path = '/static/cars/MG.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Mini':
            path = '/static/cars/Mini.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Mitsubishi':
            path = '/static/cars/Mitsubishi.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Nissan':
            path = '/static/cars/Nissan.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Opel':
            path = '/static/cars/Opel.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Porsche':
            path = '/static/cars/Porsche.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Premier':
            path = '/static/cars/Premier.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Renault':
            path = '/static/cars/Renault.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Rolls-Royce':
            path = '/static/cars/Rolls-Royce.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'San':
            path = '/static/cars/San.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Skoda':
            path = '/static/cars/Skoda.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Ssangyong':
            path = '/static/cars/Ssangyong.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Tata':
            path = '/static/cars/Tata.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Toyota':
            path = '/static/cars/Toyota.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Volkswagen':
            path = '/static/cars/Volkswagen.html'
            res.status(200).sendFile(__dirname+path);
            break;
        case 'Volvo':
            path = '/static/cars/Volvo.html'
            res.status(200).sendFile(__dirname+path);
            break;
    }
    // res.status(201)
    //     .send(user);
};
const postCar=(req,res)=>{
    user["car_name"]=req.body.car;
    res.status(201).sendFile(__dirname+'/static/miscellaneous.html');

}
const postOthers=(req,res)=>{
    user["year"]=req.body.year
    user["fuel_type"]=req.body.fuel_type
    user["private_taxi"]=req.body.p_t
    user["rto_office"]=req.body.rto
    user["vol_of_engine"]=req.body.quantity
    console.log(user)
    res.status(201).send(user)

}
router
    .route('/')
    .get(createuser)
    .post(postUser);

router
    .route('/select-state')
    .post(postState);

router
    .route('/select-company')
    .post(postCompany)
router
    .route('/select-car')
    .post(postCar)
router
    .route('/select-miscellaneous')
    .post(postOthers)
module.exports = router;