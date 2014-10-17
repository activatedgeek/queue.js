queue.js
========

A Javascript utility to queue javascript methods (both asynchronous and synchronous (which is trivial) )

Usage
=====

Declare a new object in the following manner.
```
var queue = new MethodQueue();
```

Use the run method to start the executing the queue.
```
queue.run();
```


Objects in a special format must be enqueued. Use the following specification
```
var item = { 
            fn: yourFunctionName, 
            args: [list,of,arguments]
           }
           
queue.enqueue(item);
```
* *fn* : Specify the function you want to enqueue
* *args* : Specify the argument list for the function *yourFunctionName*

Enqueue the items in correct topological sort to prevent errors.

The function prototype must have the following as the last argument:
```
/* Call the "callback" argument after the method is over */
function yourFunctionName(arg1, arg2, ... , argN, callback);
```

Example
=======
In this example I will load JQuery and JqueryUI. 
NOTE: JQuery UI needs JQuery to be loaded first.

All you need to do is, call the callback function in the onload rule of any asynchronous methods and the trivial last function call in standard methods.

```
var jsLibs = ["https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js",
			        "http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"
			       ];
			       
var queue = new MethodQueue();
for(var i=0;i<jsLibs.length;++i){
	var item = {fn: loadJS, args: [jsLibs[i]]};
	queue.enqueue(item);
}

queue.run();

function loadJS(uri, callback){
  /* Do something here to update DOM  */
  yourobject.onload = function(){
    callback.apply(this);
  }
  /* Other stuff  */
}
```
