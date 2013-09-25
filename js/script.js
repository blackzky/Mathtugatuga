/*
	Title: Mathtugatuga
	Description: A simple web application that applies the basic concepts of electromagnetics
	Author: Gervel Giva
*/
//a b c d e f g h i j k
var AXIS = ['x', 'y' , 'z', 'v', 'u', 'w'];
var VECTORS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
var DECIMAL_PLACES = 4;
var BUFFER;

$(function(){
	BUFFER = new VectorData();

	initModule("vector-magnitude", 1, ["Calculate Magnitude"]);
	initModule("unit-vector", 1, ["Calculate Unit Vector"]);
	initModule("vector-algebra", 2, ["Add Vectors", "Subtract Vectors"]);

	$("#d_place").tooltip({placement: "bottom"}).tooltip("show");
	setTimeout(function(){$("#d_place").tooltip("hide")}, 5000);

	$("body").on("change", "#d_place", function(){ DECIMAL_PLACES = this.value; });

});


function solve(mode, operation){
	switch(mode){
		case "vector-magnitude":
			vectorToMagnitude(mode);
			break;
		case "unit-vector":
			solveUnitVector(mode);
			break;
		case "vector-algebra":
			if(operation == 0){
				addVectors(mode);
			}else if(operation == 1){
				subVectors(mode);
			}else{
				alert("Nope");	
			}
			break;
		default:
			alert("Nope");	
			break;
	}

}


function addVectors(id){
	var vectors = [];
	var input_values = [];
	var vector_inputs = $("#" + id + " #vector_num").val();
	var components = $("#" + id + " #components").val();
	for(var j = 0; j < vector_inputs; j++){
		input_values = getInputValues(id + " #vector_input_" + VECTORS[j]);
		vectors.push(input_values);
	}
	var vector_sum = [];
	var out = "";
	for(var i = 0; i < components; i++){
		vector_sum.push(0);
		for(var j = 0; j < vector_inputs; j++){
			vector_sum[i] += vectors[j][i];
		}
		out += (vector_sum[i] >= 0 ? (i == 0 ? "" : " + ") : (i == 0 ? " -" : " - ")) + Math.abs(vector_sum[i].toFixed(DECIMAL_PLACES)) + AXIS[i];
	}
	$("#" + id + " #output").html("Vector Sum: <strong>" + out + "</strong>");
}

function subVectors(id){
	var vectors = [];
	var input_values = [];
	var vector_inputs = $("#" + id + " #vector_num").val();
	var components = $("#" + id + " #components").val();
	for(var j = 0; j < vector_inputs; j++){
		input_values = getInputValues(id + " #vector_input_" + VECTORS[j]);
		vectors.push(input_values);
	}
	var vector_sum = [];
	var out = "";

	for(var i = 0; i < components; i++){
		vector_sum.push(0);
	}
	vector_sum = vectors[0];
	for(var i = 0; i < components; i++){
		for(var j = 0; j < vector_inputs; j++){
			if(j != 0) vector_sum[i] -= vectors[j][i];
		}
		out += (vector_sum[i] >= 0 ? (i == 0 ? "" : " + ") : (i == 0 ? " -" : " - ")) + Math.abs(vector_sum[i].toFixed(DECIMAL_PLACES)) + AXIS[i];
	}
	$("#" + id + " #output").html("Vector Difference: <strong>" + out + "</strong>");
}

// out += "<input type='number' id='input" + i + "' class='input' value='0'/>" + AXIS[i] + (i != components-1 ? " + " : "");
function generateVectors(id){
	var out = "<br />";
	var vectors = $("#" + id + " #vector_num").val();
	var components = $("#" + id + " #components").val();
	for(var j = 0; j < vectors; j++){
		out += "<div id='vector_input_"+VECTORS[j]+"' class='row'><div class='input-group input-group-sm col-sm-1'><button class='btn disabled'>Vector " + VECTORS[j] + "</button></div>";
		for(var i = 0; i < components; i++){
			out += "<div class='input-group input-group-sm col-sm-2'><input type='number' id='input" + i + "' class='vector_input input form-control text-right' value='0'/><span class='input-group-addon'>" + AXIS[i] + "</span></div>";
		}
		out += "</div><br />";
	}
	out += " <button class='btn btn-primary' onclick='solve(\"" + id + "\", \"add\")'>Add Vectors</button>";
	out += " <button class='btn btn-primary' onclick='solve(\"" + id + "\", \"sub\")'>Subtract Vectors</button>";

	$("#" + id + " #vectors").html(out);
}
function getInputValues(id){
	var inputs = $("#" + id + " .input");
	var components = inputs.size();
	var input_values = [];
	for(var i = 0; i < components; i++){
		input_values.push(parseFloat(inputs[i].value));
	}
	return input_values;
}

function vectorToMagnitude(id){
	var input_values = getInputValues(id);
	var magnitude = getMagnitude(input_values);
	$("#" + id + " #output").html("Magnitude: <strong>" + magnitude.toFixed(DECIMAL_PLACES) + "</strong>");
}

function solveUnitVector(id){
	var input_values = getInputValues(id);
	var components = input_values.length;
	var magnitude = getMagnitude(input_values);
	var unit_vector = "";
	var component = 0;
	for(var i = 0; i < components; i++){
		component = input_values[i]/magnitude;
		unit_vector += (component >= 0 ? (i == 0 ? "" : " + ") : (i == 0 ? " -" : " - ")) + Math.abs(component.toFixed(DECIMAL_PLACES)) + AXIS[i];
	}
	$("#" + id + " #output").html("Unit Vector: <strong>" + unit_vector + "</strong>");
}


/* Vector Operations */

function getMagnitude(vector){
	var components = vector.length;
	var magnitude = 0;
	var val = 0;
	for(var i = 0; i < components; i++){
		val = Math.pow(vector[i], 2);
		magnitude += val;
	}
	magnitude = Math.pow(magnitude, 1/2);
	return magnitude;
}

/* REFACTORED CODE */
function initModule(id, size, title){
	for(var i = 0; i < size; i++){
		createVectorInputDom(id);
	}
	createActionButton(id, title);
}

function createVectorInputDom(parentID, size){
	var pdiv = "<div class='input-group input-group-sm col-sm-2'>";

	var vector = "";
	size = size || 1;
	for(var i = 0; i < size; i++){
		vector += "<br /><div class='row vector-input'>";
		vector += (pdiv + "<input type='number' class='input form-control text-right vector-x' value='0'/><span class='input-group-addon'>x</span></div>");
		vector += (pdiv + "<input type='number' class='input form-control text-right vector-y' value='0'/><span class='input-group-addon'>y</span></div>");
		vector += (pdiv + "<input type='number' class='input form-control text-right vector-z' value='0'/><span class='input-group-addon'>z</span></div>");
		vector += "</div>"; 
	}

	$("#" + parentID + " .vector-input-parent").append(vector);
}

function createActionButton(parentID, title){
	var out = "<br /><div class='row'>";
	for(var i in title){
		out += "<div class='input-group input-group-sm col-sm-2'><button class='btn btn-primary' onclick='solve(\"" + parentID + "\", " + i + ")'>" + title[i]  + "</button></div>";	
	}
	out += "</div>";
	$("#" + parentID + " .vector-input-parent").append(out);
}

function getVectorFromInputDom(domID, index){
	var vectorDom = $("#" + domID + " .vector-input");
	var vector = new VectorData();
	index = index || 0;
	vector.x = parseFloat( ($(vectorDom[index]).find(".vector-x")).val() ) || 0;
	vector.y = parseFloat( ($(vectorDom[index]).find(".vector-y")).val() ) || 0;
	vector.z = parseFloat( ($(vectorDom[index]).find(".vector-z")).val() ) || 0;
	return vector;
}

function setVectorOfInputDom(domID, vector, index){
	var vectorDom = $("#" + domID + " .vector-input");
	index = index || 0;
	($(vectorDom[index]).find(".vector-x")).val(vector.x);
	($(vectorDom[index]).find(".vector-y")).val(vector.y);
	($(vectorDom[index]).find(".vector-z")).val(vector.z);
}
