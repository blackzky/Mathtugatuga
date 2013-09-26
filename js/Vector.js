var VectorData = function(x, y, z){
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.toString = function(){
		var x = parseFloat(this.x);
		var y = parseFloat(this.y);
		var z = parseFloat(this.z);
		var str = getTerm(x, 0, "x") + getTerm(y, parseFloat(x), "y") + getTerm(z, parseFloat((x+y)+(x*y)), "z");
		return str;
	}
	function getTerm(value, prev, prepend){
		var term = "";
		if(value != 0){
			if(prev == 0){
				term = (value >= 0 ? "" : " -"); 	
			}else{
				term = (value >= 0 ? " + " : " - "); 	
			}
			term += Math.abs(value) + prepend;
		}
		return term;
	}
};

var Vector = {
	Magnitude: function(vector, decimal){
		decimal = decimal || 6;
		var magnitude = 0;
		magnitude += Math.pow(vector.x, 2);
		magnitude += Math.pow(vector.y, 2);
		magnitude += Math.pow(vector.z, 2);
		magnitude = Math.pow(magnitude, 1/2);
		return magnitude.toFixed(decimal);	
	},

	Unit: function(vector, decimal){
		decimal = decimal || 6;
		var mag = this.Magnitude(vector);
		vector.x = (vector.x/mag).toFixed(decimal);
		vector.y = (vector.y/mag).toFixed(decimal);
		vector.z = (vector.z/mag).toFixed(decimal);
		return vector;
	},

	Add: function(vectorA, vectorB, decimal){
		decimal = decimal || 6;
		var vectorR = new VectorData();
		vectorR.x = (parseFloat(vectorA.x) + parseFloat(vectorB.x)).toFixed(decimal);
		vectorR.y = (parseFloat(vectorA.y) + parseFloat(vectorB.y)).toFixed(decimal);
		vectorR.z = (parseFloat(vectorA.z) + parseFloat(vectorB.z)).toFixed(decimal);
		return vectorR;
	},

	Sub: function(vectorA, vectorB, decimal){
		decimal = decimal || 6;
		var vectorR = new VectorData();
		vectorR.x = (parseFloat(vectorA.x) - parseFloat(vectorB.x)).toFixed(decimal);
		vectorR.y = (parseFloat(vectorA.y) - parseFloat(vectorB.y)).toFixed(decimal);
		vectorR.z = (parseFloat(vectorA.z) - parseFloat(vectorB.z)).toFixed(decimal);
		return vectorR;
	}

};
