var when = function(){
    if( !(this instanceof when) ) return new when(arguments); //return new instance of itself

    var self = this; //cached so the syntax of code within the function is more readable

    self.pending = Array.prototype.slice.call(arguments[0]); //convert arguments passed in to array
    self.pending_length = self.pending.length; //cache length of the arguments array
    self.results = {length:0}; //container for results of async functions

    (function(){ // define pass() within this context so that the outer scope of self(this) is available when pass() is executed within the user's async functions
        self.pass = function(){

            //self.results.push(arguments); //push async results to cache array
            self.results[arguments[0]] = arguments[1];
            self.results.length++;

            if( self.results.length === self.pending_length ) //if all async functions have finished, pass the results to .then(), which has been redefined to the user's completion function
                self.then.call(self, self.results); 
        };
    })();
}
when.prototype = {
    then: function(){
        
        this.then = arguments[0]; //reassign .then() to the user-defined function that is executed on completion. Also ensures that this() can only be called once per usage of when()
        
        while(this.pending[0]){
            this.pending.shift().call(this, this.pass); //execute all functions user passed into when()
        }

    }
}



