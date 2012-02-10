var
	sy = require('sylvester')
	;

function LazyMatrix(n, m, v) {
	this.v = v || function() { return 0; };
	this.elements           = [];
	this.elements[0]        = [];
	this.elements[n - 1]    = [];
	this.elements[0][m - 1] = this.v(1, m);
}

LazyMatrix.prototype = {
	row: function(k) {
		if (k < 1 || k > this.elements.length) { return null; }
		var r = [];
		for(var i = 1; i <= this.elements[0].length; i++) {
			r.push(this.e(k, i));
		}
		return sy.Vector.create(r);
	},
	col: function(k) {
		if (k < 1 || k > this.elements[0].length) { return null; }
		var r = [];
		for(var i = 1; i <= this.elements.length; i++) {
			r.push(this.e(i, k));
		}
		return sy.Vector.create(r);
	},
	e: function(i, j) {
		if (i < 1 || i > this.elements.length || j < 1 || j > this.elements[0].length) { return null; }
		if(!((i - 1) in this.elements)) {
			this.elements[i - 1] = [];
		}
		if(!((j - 1) in this.elements[i - 1])) {
			this.elements[i - 1][j - 1] = this.v(i, j);
		}
		return this.elements[i - 1][j - 1];
	},
	setE: function(i, j, v) {
		if (i < 1 || i > this.elements.length || j < 1 || j > this.elements[0].length) { return null; }
		if(!((i - 1) in this.elements)) {
			this.elements[i - 1] = [];
		}
		this.elements[i - 1][j - 1] = v;
		return v;
	}
}

exports.LazyMatrix = LazyMatrix;
