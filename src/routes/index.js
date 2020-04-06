const {Router}=require('express');
const router=Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://edgar:8520@clusteredgar-shard-00-00-tname.gcp.mongodb.net:27017,clusteredgar-shard-00-01-tname.gcp.mongodb.net:27017,clusteredgar-shard-00-02-tname.gcp.mongodb.net:27017/test?ssl=true&replicaSet=ClusterEdgar-shard-0&authSource=admin&retryWrites=true&w=majority";
var r;
const dbase="people"
const collection="people"
const dbo=null;
///consultas mongo
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbo = db.db(dbase);
});

///Routes
router.get('/',(req,res)=>{
    var mysort = { name: 1 };
    dbo.collection(collection).find({ $and: [{ piranhas: { $exists: true }, age: { $gte: 65 } }] },
        { name: true, age: true, _id: false }).limit(5).sort(mysort).toArray(function (err, result) {
            if (err) throw err;
             r=result;
            db.close();
        });
    res.json(r);
  });

router.post('/',(req,res)=>{
    
  }); 
  module.exports = router;