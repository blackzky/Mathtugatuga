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
	var components = $("#" + id + " #components").val();
	var out = "Input: ";
	for(var i = 0; i < components; i++){
		out += "<input type='number' id='input" + i + "' class='input' value='0'/>" + AXIS[i] + " " + (i != components-1 ? "+" : "");
	}
	out += "<button onclick='vectorToMagnitude()'>Get Magnitude</button>";
	$("#" + id + " #input").html(out);
}

function vectorToMagnitude(){
	var id = "vector-magnitude";
	var input_values = [];
	var inputs = $("#" + id + " .input");
	var magnitude = 0;
	var val = 0;
	var components = inputs.size();
	for(var i = 0; i < components; i++){
		val = Math.pow(parseInt(inputs[i].value), 2);
		magnitude += val;
	}
	magnitude = Math.pow(magnitude, 1/2);
	$("#" + id + " #output").text("Magnitude: " + magnitude.toFixed(4));
}