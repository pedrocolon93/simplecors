//Lets require/import the HTTP module
var http = require('http');
var dispatcher = require('httpdispatcher');

var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  	application_id: "b1b996ef",
  	application_key: "0211495c00ea0a3c1025f5fc1aab9128"
});

//Lets define a port we want to listen to
const PORT=8080; 

//We need a function which handles requests and send response
function handleRequest(request, response){
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

//For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('resources');

//A sample GET request    
dispatcher.onGet("/page1", function(req, res) {
	textapi.concepts({
	  text: 'Apple was founded by Steve Jobs, Steve Wozniak and Ronald Wayne.'
	}, function(error, response) {
	  if (error === null) {
	    Object.keys(response.concepts).forEach(function(concept) {
	      var surfaceForms = response.concepts[concept].surfaceForms.map(function(sf) {
	        return sf['string'];
	      });
	      console.log(concept + ": " + surfaceForms.join(","));
	      res.writeHead(200, {
	    	"Access-Control-Allow-Origin": "*",
	    	'Content-Type': 'text/plain'}
	    	);
    		res.end('Done');
	    });
	  }
	});	

    
});    

//A sample POST request
dispatcher.onPost("/post1", function(req, res) {
    res.writeHead(200, {
    	"Access-Control-Allow-Origin": "*",
    	'Content-Type': 'text/plain'}
    	);
    res.end('Got Post Data');
});
