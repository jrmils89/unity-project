var app = angular.module("drawController", []);

app.controller("drawController", [function(){
	var self = this;

	this.text = null;
	this.groupOne = null;

	this.canvas = document.getElementById('canvas');
	this.ctx = document.getElementById('canvas').getContext('2d');

	this.ctx.fillStyle = "white";
	this.ctx.fillRect(0,0,500,300);
	this.ctx.fillStyle = "black";

	this.addElToCanvas = function(e) {
		if (self.groupOne == 'text' && self.checkRectangle) {
			self.addText(e);
			self.rectangle(e);
		}  else if (self.checkRectangle) {
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

	this.addText = function(e) {
		if (self.text == null) {self.text = ''};
		self.ctx.font = "12px sans-serif";
		self.ctx.fillText(self.text, e.layerX+5, e.layerY+25, 95);
	};

	this.rightArrow = function(e) {
    self.ctx.beginPath();
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

	this.clear = function() {
		self.ctx.clearRect(0,0,self.canvas.width, self.canvas.height);
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(0,0,500,300);
		this.ctx.fillStyle = "black";
	}

	this.download = function() {
		var dt = canvas.toDataURL();
		this.href = dt;
	};

	document.getElementById('download').addEventListener('click', this.download, false);

}])