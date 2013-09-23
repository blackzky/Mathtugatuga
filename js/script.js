var AXIS = ['x', 'y' , 'z'];
$(function(){
	$("#vectors").show();
	generateVectorInput();

	$("body").on("change", "#vector-magnitude #components", function(){
		generateVectorInput();
	});
});

function show(id){
	$(".topic").hide();
	$("#" + id).show();
}

function generateVectorInput(){
	var id ="vector-magnitude";
	$("#" + id + " #output").text('');
	var components = $("#" + id + " #components").val();
	var out = "Input: ";
	for(var i = 0; i < components; i++){
		out += "<input type='number' id='input" + i + "' class='input' value='0'/>" + AXIS[i] + " " + (i != components-1 ? "+" : "");
	}
	out += "<button onclick='vectorToMagnitude()'>Get Magnitude</button>";
	$("#" + id + " #input").html(out);
}

function getMagnitude(vector){
	console.log(vector);
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
function vectorToMagnitude(){
	var id = "vector-magnitude";
	var inputs = $("#" + id + " .input");
	var components = inputs.size();
	var input_values = [];
	for(var i = 0; i < components; i++){
		input_values.push(parseInt(inputs[i].value));
	}
	var magnitude = getMagnitude(input_values);
	$("#" + id + " #output").text("Magnitude: " + magnitude.toFixed(4));
}