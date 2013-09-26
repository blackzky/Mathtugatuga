/*
	Title: Mathtugatuga
	Description: A simple web application that applies the basic concepts of electromagnetics
	Author: Gervel Giva
*/
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

	$("body").on("change", "#d_place", function(){ 
		this.value = (this.value >= 0 ? this.value : 0);
		DECIMAL_PLACES = this.value; 
	});

});


function solve(id, operation){
	var mag, vectorA, vectorB, vectorR; 
	switch(id){
		case "vector-magnitude":
			vectorA = getVectorFromInputDom(id);
			mag = Vector.Magnitude(vectorA, DECIMAL_PLACES);
			$("#" + id + " .output").html("Magnitude: <strong>" + mag + "</strong>");
			break;
		case "unit-vector":
			vectorA = getVectorFromInputDom(id);
			vectorR = Vector.Unit(vectorA, DECIMAL_PLACES);
			setVectorOutput(id, vectorR, "Unit Vector");
			break;
		case "vector-algebra":
			vectorA = getVectorFromInputDom(id, 0);
			vectorB = getVectorFromInputDom(id, 1);
			if(operation == 0){
				vectorR = Vector.Add(vectorA, vectorB, DECIMAL_PLACES);
				setVectorOutput(id, vectorR, "Sum");
			}else if(operation == 1){
				vectorR = Vector.Sub(vectorA, vectorB, DECIMAL_PLACES);
				setVectorOutput(id, vectorR, "Defference");
			}else{
				alert("Something Went Wrong");	
			}
			break;
		default:
				alert("Something Went Wrong");	
				break;
	}

}

function setVectorOutput(parentId, vectorR, title){
	var error = (vectorR.x == "NaN" || vectorR.y == "NaN" || vectorR.z == "NaN");
	var data = error ?  "<span class='text-danger'>Error</span>" : vectorR.toString();
	var out = title + ": <strong>" + data + "</strong>";
	if(!error) out += "&nbsp;&nbsp;<button onclick='copy("+vectorR.x+", " + vectorR.y+ ", " + vectorR.z + ")' class='btn btn-info'>Copy</button>";
	$("#" + parentId + " .output").html(out);
}

function copy(x, y, z){
	BUFFER = new VectorData(x, y, z);
}
function copyFromInputDom(parentId, index){
	var vectorR = getVectorFromInputDom(parentId, index);
	BUFFER = vectorR;
}
function pasteInputDom(parentId, index){
	setVectorOfInputDom(parentId, BUFFER, index);	
}
function initModule(id, size, title){
	createVectorInputDom(id, size);
	createActionButton(id, title);
}
function createVectorInputDom(parentID, size){
	var pdiv1 = "<div class='input-group input-group-sm col-sm-1'>";
	var pdiv2 = "<div class='input-group input-group-sm col-sm-2'>";

	var vector = "";
	size = size || 1;
	for(var i = 0; i < size; i++){
		vector += "<br /><div class='row vector-input'>";
		
		vector += (pdiv1 +"<div class='btn-group'><button type='button' class='btn btn-info dropdown-toggle' data-toggle='dropdown'>Vector " + VECTORS[i] + "&nbsp;<span class='caret'></span></button><ul class='dropdown-menu'><li><a href='javascript: copyFromInputDom(\""+parentID+"\", "+i+");'>Copy</a></li><li><a href='javascript: pasteInputDom(\""+parentID+"\", "+i+");'>Paste</a></li></ul></div></div>");
 

		vector += (pdiv2 + "<input type='number' class='input form-control text-right vector-x' value='0'/><span class='input-group-addon'>x</span></div>");
		vector += (pdiv2 + "<input type='number' class='input form-control text-right vector-y' value='0'/><span class='input-group-addon'>y</span></div>");
		vector += (pdiv2 + "<input type='number' class='input form-control text-right vector-z' value='0'/><span class='input-group-addon'>z</span></div>");
		vector += "</div>"; 
	}

	$("#" + parentID + " .vector-input-parent").append(vector);
}
function createActionButton(parentID, title){
	var out = "<br /><div class='row'>";
	for(var i in title){
		out += "<div class='input-group input-group-sm col-sm-1'><button class='btn btn-primary' onclick='solve(\"" + parentID + "\", " + i + ")'>" + title[i]  + "</button></div>";	
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
