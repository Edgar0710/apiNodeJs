const {Router}=require('express');
const router=Router();
var MongoClient = require('mongodb').MongoClient;
var objectID=require('mongodb').ObjectID;
//var url = "mongodb://edgar:8520@clusteredgar-shard-00-00-tname.gcp.mongodb.net:27017,clusteredgar-shard-00-01-tname.gcp.mongodb.net:27017,clusteredgar-shard-00-02-tname.gcp.mongodb.net:27017/test?ssl=true&replicaSet=ClusterEdgar-shard-0&authSource=admin&retryWrites=true&w=majority";
var url="mongodb://localhost:27017/";
const dbase="appProductos"
const collection="productos"
///consultas mongo


router.delete("/:_id",(req,res)=>{
    borrar(req,res);
});
router.put("/:_id",(req,res)=>{
    actualizar(req,res);
});
router.post("/",(req,res)=>{
    insertar(req,res);
});
router.get("/",(req,res)=>{
    consultar(req,res);
});
//////////////funciones///////////////////
async function consultar(req ,resp) {
  try {
    const  conect=  await MongoClient.connect(url);
  const  find  =await conect.db(dbase).collection(collection).find({}).toArray();
  conect.close();
  resp.json(find);  
  } catch (error) {
      console.log(error);
  }

}

async function insertar(req ,resp) {
    try {
        console.log(req.body);
        const  conect=  await MongoClient.connect(url);
        await conect.db(dbase).collection(collection).insert(req.body);
        resp.json({"ok":"ok"});
        conect.close();
    } catch (error) {
        console.log(error);
    }
  
  }
  
async function borrar(req,res){
    try {
        console.log(req.params);
        var {_id}=req.params;
        var id= new objectID(_id);
        console.log(_id);
        const  conect=  await MongoClient.connect(url);
        await conect.db(dbase).collection(collection).deleteOne({_id:id});
        res.send('Delete');
        conect.close();
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

async function actualizar(req,res){
    try {
        var {_id}=req.params;
        var id= new objectID(_id);
        const  conect=  await MongoClient.connect(url);
        await conect.db(dbase).collection(collection).update({_id:id},{$set:{_id:id,...req.body}});
        res.send('update');
        conect.close();
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

///Routes
  module.exports = router;  