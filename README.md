####What is When-Then?

When-Then is meant to act in the fashion of a very simple pseudo-promise.

One of the more common uses of promise/deferreds in javascript is to execute a completion function when a number of asynchronous requests are done. 

While there are a number of deferred and promise libraries, for this simple use-case the extra syntax to setup a promise object can be more verbose than is necessary.


####Why would I use When-Then?

Suppose your app needs to do several asynchronous requests, but you want to work with the data only once all requests are complete.

When-Then lets you pass any number of functions as arguments, such as asynchronous requests, followed by a chained then() function that gets passed the final results.

####Examples
```
//#### TEST CASE 1 ####
when(
    function(pass){
        pass(2);
    },
    function(pass){

        setTimeout(function(){
            pass(1000);
        }, 1000);

    },
    function(){
        
        setTimeout(function(){
            pass(100);
        }, 100);

    },
    function(){
        
        setTimeout(function(){
            pass(2000);
        }, 2000);

    }
)
.then(function(results){
    console.log(results);
})



//#### TEST CASE 2 (Node.js required) ####
var http = require('http');

var get = function(url, pass){
    http.get({ host: url, port: 80 }, function(res){
        var body = [];
        res.on('data', function(chunk){
            body.push(chunk);
        })
        .on('end', function(){
            
            pass(body.join(''));
            
        });
    })
    .on('error', function(err){
        pass(err);
    });
}

when( 
    function(pass){
        get('www.google.com', pass);
    },
    function(pass){
        get('news.ycombinator.com', pass);
    },
    function(pass){
        get('io9.com', pass);
    }
)
.then(function(results){

    console.log(results);

});
```