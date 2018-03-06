var express = require("express");
var db = require("mysql");
var fs = require("fs");
var parser = require("body-parser");
var pdfCreator = require("pdfkit");

var app = express();
var parserJSON = parser.json();
var dbConn = db.createConnection({
	host : "localhost",
	user : "root",
	password : "",
	database : "test"
});
dbConn.connect();

app.get("/", function(request, response){
	fs.readFile("./public/index.html", function(error, data){
		response.end(data);
	});
});
app.post("/", parserJSON, function(request, response){
	dbConn.query("SELECT * FROM user WHERE firstName=\"" + request.body.data + "\"", function(error, result, fields){
		if(error){
			console.log("error");
		}else{
			if(result[0] == undefined){
				response.json({data : false});
			}else{
				var newPDF = new pdfCreator();
				var streamPDF = fs.createWriteStream("buffer_pdf.pdf");
				newPDF.pipe(streamPDF);
				newPDF.text(result[0].firstName, 10, 10)
					  .text(result[0].lastName, 80, 10)
					  .image(result[0].image, 0, 50, {width : 300, height : 300});
				streamPDF.on("close", function(){
					var pdf = {
						pdf : fs.readFileSync("buffer_pdf.pdf")
					}
					dbConn.query("UPDATE user SET ? WHERE firstName=\"" + request.body.data + "\"", pdf, function(error, result){
						
					});
				});
				newPDF.end();
				response.json({data : true});
			}
		}
	});
});
app.listen("4545", function(error){
	if(!error){
		console.log("[Server]: Server has been started");
	}
});
