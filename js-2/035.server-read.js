var http = require("http");
var fs = require("fs");
var server = http.createServer(function(req,res){
	console.log(req.url);
	if(req.url == "/favicon.ico"){
		res.end("favicon.ico");
	}
	var filePath = "./" + req.url;
	fs.readFile(filePath,function(err,data){
		if(err){
			res.statusCode = 404;
			res.end("not found");
		}else{
			res.end(data);
		}
	});
	// res.end("hello");
});
server.listen(3000,"127.0.0.1",function(){
	console.log("Server running at https://127.0.0.1:3000");
});