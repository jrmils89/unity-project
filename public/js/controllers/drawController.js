var app = angular.module("drawController", []);

// creating a controller for the drawing directive 
app.controller("drawController", [function(){
	var self = this;

	// initializing / instantiating / decalaring the variable 'text' & groupOne
	// as null because the user has not drawn anything yet 
	this.text = null;
	// same thing but the variable that will be used when 
	// a user groups text with shapes (referencing ng-model in the draw.html input fields)
	this.groupOne = null;

	// retrieving the element <canvas> by it's id, 'canvas' in order to
	// manipulate the DOM within the draw.html partial
	this.canvas = document.getElementById('canvas');
	// storing the '2d' data inside the ctx variable we created
	this.ctx = document.getElementById('canvas').getContext('2d');

	// using google's built in data attributes 
	this.ctx.fillStyle = "white";
	this.ctx.fillRect(0,0,self.canvas.width,self.canvas.height);
	this.ctx.fillStyle = "black";

	// creating a function that will activate once a user chooses 
	// an item to use in their canvas
	this.addElToCanvas = function(e) {
		// if the user's group consists of text and a rectangle,
		// add text to the rectangle
		if (self.groupOne == 'text' && self.checkRectangle) {
			self.addText(e);
			self.rectangle(e);
		// same logic applies for if the user only wants the shape without text
		}  else if (self.checkRectangle) {
			// just return the rectangle
			self.rectangle(e);
		} else if (self.groupOne =='text') {
			self.addText(e);
		} else if (self.groupOne =='rightArrow') {
			self.rightArrow(e);
		} else if (self.groupOne =='leftArrow') {
			self.leftArrow(e);
		} else if (self.groupOne =='upArrow') {
			self.upArrow(e);
		} else if (self.groupOne =='downArrow') {
			self.downArrow(e);
		}
	};

	// function that is invoked in the addElToCanvas function when a user 
	// elects to add text to their canvas
	this.addText = function(e) {
		// if user did not enter text, the text remains empty
		if (self.text == null) {self.text = ''};
		// setting the defaut font for text
		self.ctx.font = "12px sans-serif";
		// the text will be placed wherever the user clicks
		self.ctx.fillText(self.text, e.layerX+5, e.layerY+25, 95);
	};

	// all of the shapes uses the same logic in terms of where they will be placed
	// on the canvas
	this.rightArrow = function(e) {
    self.ctx.beginPath();
    	// except you will be able to move the shapes 
		self.ctx.moveTo(e.layerX, e.layerY);
		self.ctx.lineTo(e.layerX+50, e.layerY);
		self.ctx.lineTo(e.layerX+40, e.layerY-10);
		self.ctx.moveTo(e.layerX+50, e.layerY);
		self.ctx.lineTo(e.layerX+40, e.layerY+10);
		self.ctx.stroke();
	};

	this.leftArrow = function(e) {
		self.ctx.beginPath();
		self.ctx.moveTo(e.layerX, e.layerY);
		self.ctx.lineTo(e.layerX-50, e.layerY);
		self.ctx.lineTo(e.layerX-40, e.layerY-10);
		self.ctx.moveTo(e.layerX-50, e.layerY);
		self.ctx.lineTo(e.layerX-40, e.layerY+10);
		self.ctx.stroke();
	};

	this.upArrow = function(e) {
    self.ctx.beginPath();
		self.ctx.moveTo(e.layerX, e.layerY);
		self.ctx.lineTo(e.layerX, e.layerY-50);
		self.ctx.lineTo(e.layerX-10, e.layerY-40);
		self.ctx.moveTo(e.layerX, e.layerY-50);
		self.ctx.lineTo(e.layerX+10, e.layerY-40);
		self.ctx.stroke();
	};

	this.downArrow = function(e) {
		self.ctx.beginPath();
		self.ctx.moveTo(e.layerX, e.layerY);
		self.ctx.lineTo(e.layerX, e.layerY+50);
		self.ctx.lineTo(e.layerX-10, e.layerY+40);
		self.ctx.moveTo(e.layerX, e.layerY+50);
		self.ctx.lineTo(e.layerX+10, e.layerY+40);
		self.ctx.stroke();
	};

	this.rectangle = function(e) {
		self.ctx.beginPath();
		self.ctx.moveTo(e.layerX, e.layerY);
		self.ctx.lineTo(e.layerX, e.layerY+50);
		self.ctx.lineTo(e.layerX+100, e.layerY+50);
		self.ctx.lineTo(e.layerX+100, e.layerY);
		self.ctx.lineTo(e.layerX, e.layerY);
		self.ctx.stroke();
	};

	// if the user clicks the 'clear' button, it will trigger 'this.clear()'
	this.clear = function() {
		self.ctx.clearRect(0,0,self.canvas.width, self.canvas.height);
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(0,0,self.canvas.width,self.canvas.height);
		this.ctx.fillStyle = "black";
	}

	// if user clicks on the button that triggers this click function
	this.download = function() {
		// the browser will access it's built-in function - toDataURL()
		// which will process the user's canvas and convert the image into 
		// a URL
		var dt = canvas.toDataURL();
		this.href = dt;
	};

	// creating a click function and attaching it to the download button
	// which will listen for when the user clicks 'download'
	document.getElementById('download').addEventListener('click', this.download, false);

}])