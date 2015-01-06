(function(root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.CanvasBP = factory();
	}
} (this, function() {
	'use strict';

	function CanvasBP (config) {
		this.canvas = config.canvas || document.querySelector('canvas');
		this.canvas.width = config.width || window.innerWidth;
		this.canvas.height = config.height || window.innerHeight;
		this.context = this.canvas.getContext(config.context || '2d');
		this.frameRequest = undefined;
		this.startTime = undefined;
	}

	CanvasBP.prototype.render = function (drawing) {
		this.context.save();

		drawing.call(this);

		this.context.restore();
	};

	CanvasBP.prototype.animate = function (callback, startTime) {
		if (!startTime) {
			this.startTime = Date.now();
		}

		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		callback.call(this, Date.now() - this.startTime);

		this.frameRequest = window.requestAnimationFrame(
			this.animate.bind(this, callback, this.startTime)
		);
	};

	CanvasBP.prototype.stop = function() {
		window.cancelAnimationFrame(this.frameRequest);
	};

	return CanvasBP;
}));
