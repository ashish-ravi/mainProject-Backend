const express = require("express");
var bodyParser = require('body-parser')
const mongoConnect = require("./db/database").mongoConnect;
const Users = require("./db/users")


const app = express();

app.use(function(req,res,next){
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the 
    // to the API (e.g in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json())

// app.use(function(req,res,next){
//     // res.setHeader('Access-Control-Allow-Origin', '*');  //setting header to let any users or origins to access our server/backend
//     // res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
//     // res.setHeader('Access-Control-Allow-Header', 'X-Requested-With','content-type');

// })

const users = [
    {
        id: 1,
        name: "Ashish",
        email: "ashishravi2000@gmail.com",
        mobileNumber: "8123477990",
    },
    {
        id: 2,
        name: "Amit",
        email: "xyz@gmail.com",
        mobileNumber: "9898239839",
    },
    {
        id: 3,
        name: "Varsha",
        email: "abc@gmail.com",
        mobileNumber: "9823932833",
    },
    {
        id: 4,
        name: "Tanya",
        email: "uef@gmail.com",
        mobileNumber: "2723673323",
    }
];

app.get("/", function(req,res){
    console.log("connection made")
    res.send(`<h1>Hello</h1>`);

});

app.get("/users", function(req,res){
    console.log("users post hit")
    res.json(users);
})

app.get("/users/:userId", function(req,res){
    console.log(req);
    
    const userId = parseInt(req.params.userId) ;
    const result = users.filter((user) => {
        return user.id == userId
    });

    console.log(result)

    if(result.length > 0){
        res.json(result);
    }else{
        res.json({message:"No data found!!"})
    }
    
    
})

app.get("/users/sortByAge/:age", function(req, res){
    const age = parseInt(req.params.age);
    const result = users.filter((user) => {
        return user.age <= age
    });

    console.log(result)

    if(result.length > 0){
        res.json(result);
    }else{
        res.json({message:"No data found!!"})
    }
});

app.post("/users", function(req,res){
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const mobileNumber = req.body.mobileNumber;
    console.log("users post hit")

    const UserInstance = new Users();
    console.log(UserInstance)

    let newUser = { id, name, email, mobileNumber };  // or const newUser = { id, name, age }; (same name so can remove)
    
    users.push(newUser);

    UserInstance.save(newUser)

    res.json(users);
})

app.post("/users/delete/:id", function(req,res){
    let paramsId = parseInt(req.params.id);

    const UserInstance = new Users();

    UserInstance.del(paramsId)

    let newUserData = users.filter((user)=>{
        return user.id !== paramsId;
    })

    console.log("newUserData",newUserData );
    res.json(newUserData);
})

app.post("/users/del", function(req,res){
    const name = req.body.name;

    const UserInstance = new Users();

    UserInstance.delByName(name)

    // let newUserData = users.filter((user)=>{
    //     return user.id !== paramsId;
    // })

    // console.log("newUserData",newUserData );
    // res.json(newUserData);
})

app.post("/users/update/:id", function(req,res){
    let paramsId = parseInt(req.params.id);
    console.log("paramsId",paramsId)

    let newUserData = users.filter((user)=>{
        return user.id !== paramsId;
    })
    console.log("newUserData", newUserData);
    
    const id = req.body.id;
    const name = req.body.name;
    const age = req.body.age;

    const newUser = { id:id, name:name, age:age };
    newUserData.push(newUser);
    console.log("newUserData after", newUserData);
    res.json(newUserData);
})



mongoConnect( (client) => {
    console.log("Client", client);
    app.listen(8000, function(){
        console.log("App listening at 8000")
    })

} )
