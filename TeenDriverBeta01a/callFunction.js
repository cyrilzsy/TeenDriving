function callFunction(task,clickAreaResponse) {
	let functionName = task.callFunction.functionName;
	let parameters = task.callFunction.functionParameters;
	let input = "";
	console.log('functionName: ' + functionName);
	console.log(parameters);
	if (functionName=='loadVideo') {
		console.log('videoNumber: ' + parameters.videoNumber);
		document.getElementById('videoSource').setAttribute('src',parameters.videoNumber + '.webm');
	    document.getElementById("video").load();
	    document.getElementById("inputHeader").innerHTML = "Input:";
	} else if (functionName=='addVideoArea') {
		addVideoArea(parameters.upperLeftCoords,parameters.lowerRightCoords,function () {clickResponse(parameters.clickResponse)});
		input = clickAreaResponse;
	} else if (functionName=='clearVideoAreas') {
		$('#clickAreas').empty();
	} else if (functionName=='playVideoUntil') {
		if (parameters.startTime===undefined) {	
			video.currentTime = 0.;
		} else {
			video.currentTime = parameters.startTime;
		}
			pauseVideoTime = parameters.pauseTime;
		video.play();
		video.addEventListener("timeupdate", pausing_function);
		document.getElementById("response").value = "";
	} else if (functionName=='playAndCountTime'){
		addVideoArea(parameters.upperLeftCoords,parameters.lowerRightCoords,function () {countResponseTime(parameters.clickResponseFast,parameters.clickResponseSlow,parameters.expertTime)});
		input = clickAreaResponse;
	    if (parameters.startTime===undefined) {
			video.currentTime = 0.;
		} else {
			video.currentTime = parameters.startTime;
		}
			pauseVideoTime = parameters.pauseTime;
		video.play();
		startTimer();
		video.addEventListener("timeupdate", pausing_function);
		document.getElementById("response").value = "";
	}
	return input;
}

var startTime = 0;

function startTimer() {
	startTime = new Date();		
}

function countResponseTime(clickResponseFast,clickResponseSlow,expertTime) {
	let endTime = new Date();
	let diff = endTime - startTime;
	if (diff <= expertTime) {
	    $("input").val(clickResponseFast);
	} else {
	    $("input").val(clickResponseSlow);
	}
	console.log('diff = ' + diff);
	send();
}

function clickResponse(clickResponse) {
	$("input").val(clickResponse);
	send();		
}

