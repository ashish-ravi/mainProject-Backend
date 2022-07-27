const getDb = require("./database").getDb;

class Users{
    save(user){
        const db = getDb();
        db.collection("users").insertOne(user).then((result)=> {
            console.log("result", result)
        }).catch((err) => {
            console.log(err)
        })
    }
    del(delId){
        const db = getDb();
        db.collection("users").findOneAndDelete({id:{$eq:delId}}).then((result)=> {
            console.log("result", result)
        }).catch((err) => {
            console.log(err)
        })
    }
    delByName(delName){
        const db = getDb();
        db.collection("users").findOneAndDelete({name:{$eq:delName}}).then((result)=> {
            console.log("result", result)
        }).catch((err) => {
            console.log(err)
        })
    }
}


module.exports = Users;