const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true });
const dbName = 'it';
client.connect(err => {
	if(err){
		console.log("err...",err);
		throw err;
	}
	console.log("ok");
	const db = client.db(dbName);
	const collection = db.collection('user');

	/*新增*/
  	/*collection.insertMany([{name:"jack",age:18},{name:"rose",age:20}],(err,docs)=>{
  		if(err){
  			console.log(err);
  		}else{
  			console.log(docs);
  		}
  		client.close();
  	})*/

  	/*查询*/
  	/*collection.find({age:{$lt:20}}).toArray((err,docs)=>{
  		if(err){
  			console.log(err);
  		}else{
  			console.log(docs);
  		}
  		client.close();
  	})*/

  	/*更新*/
  	collection.updateOne({name:"jack"},{$set:{age:32}},(err,docs)=>{
  		if(err){
  			console.log(err);
  		}else{
  			console.log(docs);
  		}
  		client.close();
  	})	
    
  	/*删除*/
  	/*collection.deleteOne({name:"jack"},(err,docs)=>{
  		if(err){
  			console.log(err);
  		}else{
  			console.log(docs);
  		}
  		client.close();
  	})*/
});