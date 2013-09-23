/*
	Title: Mathtugatuga
	Description: A simple web application that applies the basic concepts of electromagnetics
	Author: Gervel Giva
*/
var AXIS = ['x', 'y' , 'z'];
var VECTORS = ['A', 'B', 'C'];
var DECIMAL_PLACES = 4;
$(function(){
	show("vector-magnitude");
	generateVectorInput("vector-magnitude", "Get Magnitude");
	generateVectorInput("unit-vector", "Get Unit Vector");
	generateVectors("vector-algebra"); 

	$("body").on("change", "#d_place", function(){
		DECIMAL_PLACES = this.value;
	});
	$("body").on("change", "#vector-magnitude #components", function(){generateVectorInput("vector-magnitude", "Get Magnitude"); });
	$("body").on("change", "#unit-vector #components", function(){generateVectorInput("unit-vector", "Get Unit Vector"); });
	$("body").on("change", "#vector-algebra #vector_num, #vector-algebra #components", function(){
		generateVectors("vector-algebra"); 
	});
});

function show(id){
	$(".topic").hide();
	$("#" + id).show();
}

function generateVectorInput(id, title){
	$("#" + id + " #output").text('');
	var components = $("#" + id + " #components").val();
	var out = "Input: ";
	for(var i = 0; i < components; i++){
		out += "<input type='number' id='input" + i + "' class='input' value='0'/>" + AXIS[i] + (i != components-1 ? " + " : "");
	}
	out += " <button onclick='solve(\"" + id + "\")'>" + title  + "</button>";
	$("#" + id + " #input").html(out);
}

function solve(mode, operation){
	switch(mode){
		case "vector-magnitude":
			vectorToMagnitude(mode);
			break;
		case "unit-vector":
			solveUnitVector(mode);
			break;
		case "vector-algebra":
			solveVectorAlgebra(mode, operation);
			break;
		default:
			alert("Nope");	
			break;
	}

}

function solveVectorAlgebra(id, operation){
	switch(operation){
		case "add":
			addVectors(id);
			break;
		case "sub":
			subVectors(id);
			break;
		default:
			alert("nope");
			break;
	}
}

function addVectors(id){
	var vectors = [];
	var input_values = [];
	var vector_inputs = $("#" + id + " .vector_input").size();
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
		out += (vector_sum[i] > 0 ? (i == 0 ? "" : " + ") : (i == 0 ? "" : " - ")) + vector_sum[i].toFixed(DECIMAL_PLACES) + AXIS[i];
	}
	$("#" + id + " #output").text(out);
}

function subVectors(id){
	var vectors = [];
	var input_values = [];
	var vector_inputs = $("#" + id + " .vector_input").size();
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
		out += (vector_sum[i] >= 0 ? (i == 0 ? "" : " + ") : " ") + vector_sum[i].toFixed(DECIMAL_PLACES) + AXIS[i];
	}
	$("#" + id + " #output").text(out);
}

function generateVectors(id){
	var out = "";
	var vectors = $("#" + id + " #vector_num").val();
	var components = $("#" + id + " #components").val();
	for(var j = 0; j < vectors; j++){
		out += "<div id='vector_input_"+VECTORS[j]+"' >Vector " + VECTORS[j] + ": <span class='vector_input'>";
		for(var i = 0; i < components; i++){
			out += "<input type='number' id='input" + i + "' class='input' value='0'/>" + AXIS[i] + (i != components-1 ? " + " : "");
		}
		out += "</span></div>";
	}
	out += " <button onclick='solve(\"" + id + "\", \"add\")'>Add Vectors</button>";
	out += " <button onclick='solve(\"" + id + "\", \"sub\")'>Subtract Vectors</button>";

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
	$("#" + id + " #output").text("Magnitude: " + magnitude.toFixed(DECIMAL_PLACES));
}

function solveUnitVector(id){
	var input_values = getInputValues(id);
	var components = input_values.length;
	var magnitude = getMagnitude(input_values);
	var unit_vector = "";
	var component = 0;
	for(var i = 0; i < components; i++){
		component = input_values[i]/magnitude;
		unit_vector += (component > 0 ? (i == 0 ? "" : " + ") : " - ") + component.toFixed(DECIMAL_PLACES) + AXIS[i];
	}
	$("#" + id + " #output").text("Unit Vector: " + unit_vector);
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