var AXIS = ['x', 'y' , 'z'];
var DECIMAL_PLACES = 4;
$(function(){
	show("vectors");
	generateVectorInput("vector-magnitude", "Get Magnitude");
	generateVectorInput("unit-vector", "Get Unit Vector");

	$("body").on("change", "#d_place", function(){
		DECIMAL_PLACES = this.value;
	});
	$("body").on("change", "#vector-magnitude #components", function(){generateVectorInput("vector-magnitude", "Get Magnitude"); });
	$("body").on("change", "#unit-vector #components", function(){generateVectorInput("unit-vector", "Get Unit Vector"); });
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

function solve(mode){
	switch(mode){
		case "vector-magnitude":
			vectorToMagnitude(mode);
		break;
		case "unit-vector":
			solveUnitVector(mode);
		break;
		default:
		alert("Nope");	
		break;
	}

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