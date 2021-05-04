const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 20;
canvas.height = 595;

let context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

let defaultColor = "white"
let penColor = "black";
let penStroke = "2";
let isDrawing = false;
let paths = [];
let index = -1;

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", move, false);
canvas.addEventListener("touchend", stop, false);

canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", move, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);


function start(event) {
	isDrawing = true;
	context.beginPath()
	context.moveTo(event.clientX - canvas.offsetLeft,
					event.clientY - canvas.offsetTop);
	event.preventDefault();
}

function move(event) {
	if (isDrawing){
		context.lineTo(event.clientX - canvas.offsetLeft,
						event.clientY - canvas.offsetTop);
		context.strokeStyle = penColor;
		context.lineWidth = penStroke;
		context.lineCap = "round";
		context.lineJoin = "round";
		context.stroke();
	}
	event.preventDefault();
}

function stop(event) {
	if (isDrawing){
		context.stroke();
		context.closePath();
		isDrawing = false;
	}
	event.preventDefault();

	if (event.type != "mouseout"){
		paths.push(context.getImageData(0, 0, canvas.width, canvas.height))
		index += 1;
	}
	
}

function changeColor(element) {
	penColor = element.style.background;
}

function clearBoard() {
	context.fillStyle = defaultColor;
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillRect(0, 0, canvas.width, canvas.height);

	paths = []
	index = -1
}

function undo() {
	if (index <= 0){
		clearBoard()
	} else {
		index -= 1;
		paths.pop();
		context.putImageData(paths[index], 0, 0);
	}
	
}