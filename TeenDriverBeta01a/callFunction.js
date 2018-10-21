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
	} else if (functionName=='playAndCountTime') {
		addVideoArea(parameters.upperLeftCoords,parameters.lowerRightCoords,function () {countResponseTime(parameters.clickResponseFast,parameters.clickResponseSlow,parameters.expertTime)});
		input = clickAreaResponse;
	} else if (functionName=='countAreas') {
		addVideoArea(parameters.upperLeftCoords,parameters.lowerRightCoords,function () {countAreas(parameters.numArea)});
		areasList.push(parameters.numArea);
		numAreas += 1;
		input = 'Found 0 out of ' + numAreas;
	}

	if (functionName=='playVideoUntil' || functionName=='playAndCountTime') {
	    if (parameters.startTime===undefined) {
			video.currentTime = 0.;
		} else {
			video.currentTime = parameters.startTime;
		}
			pauseVideoTime = parameters.pauseTime;
		video.play();
		if (functionName=='playAndCountTime') {
			startTimer();
		}
		video.addEventListener("timeupdate", pausing_function);
		document.getElementById("response").value = "";	
	}
	return input;
}


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

function countAreas(numArea) {
	if (areasList.includes(numArea)) {
		areasList = areasList.slice(areasList.indexOf(numArea) + 1);
	}
	$("input").val('Found ' + (numAreas - areasList.length) + ' out of ' + numAreas);
}

function countFound() {
	var rating = "";
	if ((numAreas - areasList.length)/numAreas > 1/2) {
		rating = 'Good! you found most of them';
	} else {
		rating = 'Fair, there are more areas here';
	}
	document.getElementById("input").value += '. ' + rating + '.';
	send();	
}

function clickMe(element) {
	$("#input").val(element.value);
	send();
}

function RandomNumber() {
    var a = Math.floor(Math.random() * 10);
    var str = "Next course please!";
    $("#input").val(str + a);
    send();
}


