const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://ashish:admin@cluster0.qxq4v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    ).then((result) => {
        console.log("connected")
        _db = result.db();
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

const getDb = () => {
    if(_db){
        return _db;
    }
    throw "No database found";
};

// module.exports = mongoConnect;
// to export multiple things
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;