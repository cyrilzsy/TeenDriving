function callFunction(task,clickAreaResponse) {
	let functionName = task.callFunction.functionName;
	let parameters = task.callFunction.functionParameters;
	let input = "";
	let divBoxId = "";
	console.log('functionName: ' + functionName);
	console.log(parameters);

	if (functionName=='loadVideo') {
		console.log('videoNumber: ' + parameters.videoNumber);
		loadVideo(parameters.videoNumber);
	} else if (functionName=='addVideoArea') {
		addVideoArea(parameters.upperLeftCoords,parameters.lowerRightCoords,parameters.numArea,function (event) {clickResponse(event,parameters.clickResponse)});
		input = clickAreaResponse;
	} else if (functionName=='clearVideoAreas') {
		clearVideo();
	} else if (functionName=='playVideoUntil') {
	    // disableButtonUntil(parameters.pauseTime);
	} else if (functionName=='playAndCountTime') {
		addVideoArea(parameters.upperLeftCoords,parameters.lowerRightCoords,parameters.numArea, function (event) {countResponseTime(event,parameters.clickResponseFast,parameters.clickResponseSlow,parameters.expertTime)});
		// disableButtonUntil(parameters.expertTime);
        input = clickAreaResponse;
	} else if (functionName=='countTime') {
		addMovingArea(parameters.movingAreas, function (event) {countResponseTime(event,parameters.clickResponseFast,parameters.clickResponseSlow,parameters.expertTime)});
		// disableButtonUntil(parameters.expertTime);
		input = clickAreaResponse;
	} else if (functionName=='countAreas') {
		addVideoArea(parameters.upperLeftCoords,parameters.lowerRightCoords,parameters.numArea, function (event) {countAreas(event,parameters.numArea)});
		areasList.push(parameters.numArea);
		numAreas += 1;
		input = 'Found 0 out of ' + numAreas;
		console.log('areasList:');
		console.log(areasList);
	} else if (functionName=='commentaryDrive') {
		addMovingArea(parameters.movingAreas, function (event) {clickResponse(event,parameters.clickResponse,parameters.pause)});
		input = clickAreaResponse;
	} else if (functionName=='addArrow') {
		addArrow(parameters.arrowId, function (event) {clickResponse(event,parameters.clickResponse,parameters.pause)});
		input = clickAreaResponse;
	}else if (functionName=='countProgress') {
		progress(parameters.courseName);
	}

	if (functionName=='playVideoUntil' || functionName=='playAndCountTime' || functionName=='countTime') {
	    if (parameters.startTime===undefined) {
			video.currentTime = 0.;
		} else {
			video.currentTime = parameters.startTime;
		}
		pauseVideoTime = parameters.pauseTime;
		video.play();
		video.addEventListener("timeupdate", pausing_function);
		document.getElementById("response").value = "";
		// disableButtonUntil(parameters.pauseTime);
	}
	return input;
}

function countResponseTime(event,clickResponseFast,clickResponseSlow,expertTime) {
	var diff = video.currentTime;
	console.log('countResponseTime, expert = ' + expertTime + ', user = ' + diff);
	if (diff <= expertTime) {
	    $("#input").val(clickResponseFast);
	} else {
	    $("#input").val(clickResponseSlow);
	}
	event.currentTarget.remove();
	send();
}

function clickResponse(event,clickResponse,pause) {
	if (!!pause) {
		video.pause();
	}
	$("#input").val(clickResponse);
	send();		
}

function countAreas(event,numArea) {
	let index = areasList.indexOf(numArea);
	console.log('countAreas, numArea: '+ numArea + ', index: ' + index + ', areasList:');
	console.log(areasList);
	if (index>=0) {
		areasList.splice(index,1);
	}
	console.log('countAreas, areasList:');
	console.log(areasList);
	$("#input").val('Found ' + (numAreas - areasList.length) + ' out of ' + numAreas);
	// $('#clickArea' + numArea).click(function() {});
 	// event.currentTarget.remove();
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

function clickMe(element,time) {
	var clickTime = video.currentTime;
    if (time && clickTime <= time) {
	    alert("Please finish watching the video and read all the instructions for this step before continue!");
        disableButtonUntil(time);
	}else {
        if (!!element.value) {
            $("#input").val(element.value);
        } else if (!!element.text) {
            $("#input").val(element.text);
        }
        send();
    }
}

function RandomNumber() {
    var str = "";
    var a = Math.floor(Math.random() * 4 ) + 1;
	if (a==1) {
		str = "What happen next?";
	}else if (a==2) {
		str = "Look for hidden road users";
	}else if (a==3) {
		str = "Check response time";
	}else if (a==4) {
		str = "Commentary Drive";
	}else if (a==5) {
		str = "Analyze the crashes";
	}
    $("#input").val(str);
    send();
}

function disableButtonAfterClick(element){
    element.disabled = true;
    // setTimeout(function() {
    //     element.disabled = false;
    // }, 5000);
}

function disableButtonUntil(time){
	$(':button').prop('disabled', true);
    if (time) {
        setTimeout(function () {
            $(':button').prop('disabled', false);
        }, time * 1000);
    }
}

// function skipAlert(time) {
//     var clickTime = video.currentTime;
//     if (clickTime <= time) {
// 	    alert("Please finish watching the video and read all the instructions for this step before continue!");
//         disableButtonUntil(time);
// 	}
// }

function Process(courseType) {
    if (courseType == WN) {
        wn = wn + 1;
    }else if (courseType == AC) {
        ac = ac + 1;
    }else if (courseType == CD) {
        cd = cd + 1;
    }else if (courseType == HR) {
        hr = hr + 1;
    }else if (courseType == RT) {
        rt = rt + 1;
    }
    var trace1 = {
      x: ['WN', 'AC', 'CD', 'HR', 'RT'],
      y: [wn, ac, cd, hr, rt],
      marker:{
        color: ['rgba(204,70,60,1)', 'rgba(222,45,38,0.8)', 'rgba(104,85,30,1)', 'rgba(155,50,80,1)', 'rgba(90,204,156,1)']
      },
      type: 'bar'
    };

    var data = [trace1];

    var layout = {
      title: 'Progress'
    };

    document.getElementById('process_plot').innerHTML = Plotly.newPlot('myDiv', data, layout);
}