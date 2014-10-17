function MethodQueue(){
	var queue = [];
	var self;

	this.length = function(){
		return queue.length;
	};

	/* 
	 * Check README for specific details on the input format
	 */
	this.enqueue = function(method){
		queue.push(method);
	};

	/* Returns undefined when queue is empty */
	this.front = function(){
		return queue[0];
	};

	/* Clear all queue */
	this.flush = function(){
		queue = [];
	};

	/* Executes all functions in the queue */
	this.run = function(){
		if(queue.length<1)
			return;
		self = this;
		var item = queue.shift();
		/* Add a callback to the function arguments 
		 * Can be used if required*/
		item.args.push(function(){
			self.run();
		});
		item.fn.apply(this, item.args);
	};
}
