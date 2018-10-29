var videoWidth = 0, videoHeight = 0; // width and height of the video

function getwh() {
	videoWidth = $('#video').width();
	videoHeight = $('#video').height();
	$('#dialog').height(videoHeight);
}

var pausing_function = function() {
    if(this.currentTime > pauseVideoTime) {
        this.pause();
        // remove the event listener after you paused the playback
        this.removeEventListener("timeupdate",pausing_function);
    }
};

function addVideoArea(upperLeftCoords,lowerRightCoords,numArea=undefined,fn=function(){}) {
// video_div
//   video
//     source
//   div#clickAreas
//     div.clickArea#clickArea0
//     div.clickArea#clickArea1
// [don't use <a> because you can see the link]

	let n = document.getElementsByClassName("clickArea").length; // number of areas

	let divBox = document.createElement('div'); // new div.clickArea
	divBox.setAttribute("class","clickArea");
	divBox.setAttribute("position","absolute");
	divBox.setAttribute("z-index","+1");
	divBox.onclick = fn;

	let divBoxId0 = 'clickArea';
	if (numArea>=0) {
		divBoxId0 += numArea;
	} else {
		divBoxId0 += n;
	}
	divBox.setAttribute("id",divBoxId0);
	let divBoxId = '#' + divBoxId0;
	$('#clickAreas').append(divBox); // use jQuery append() instead of HTML DOM appendChild()

	show_box(divBoxId,upperLeftCoords,lowerRightCoords);
}

function show_box(divBoxId,upperLeftCoords,lowerRightCoords) {
	$(divBoxId).offset({top:upperLeftCoords[1]*videoHeight/100,left:upperLeftCoords[0]*videoWidth/100});
	$(divBoxId).height((lowerRightCoords[1] - upperLeftCoords[1])*videoHeight/100);
	$(divBoxId).width((lowerRightCoords[0] - upperLeftCoords[0])*videoWidth/100);

	hintLevelChange();
}

function hintLevelChange() {
	let x = document.getElementsByClassName("clickArea");
	let hintLevel = document.getElementById("hintLevel").value;
	let alpha = 0.5*hintLevel/10;
	for (i=0; i<x.length; i++) {
		x[i].style.background = "rgba(0,0,0," + alpha + ")";
		x[i].style.color = "#f1f1f1";
	};
}

function showArea(alpha) {
	var x = document.getElementsByClassName("clickArea");
	for (i=0; i<x.length; i++) {
		x[i].style.background = "rgba(0,0,0," + alpha + ")";
		x[i].style.color = "#f1f1f1";
	};
	setTimeout(hideArea,1000);
}

function hideArea() {
	var x = document.getElementsByClassName("clickArea");
	for (i=0; i<x.length; i++) {
		x[i].style.background = "rgba(0,0,0,0)";
		x[i].style.color = "#f1f1f1";
	};
}

function clearVideo(reset=true) {
	$('#clickAreas').empty();
	if (reset) {
		count_misses(true);
	}
}

var videos_seen = [];

function loadVideo(videoNumber)	{
	document.getElementById('videoSourceWebm').setAttribute('src','videos/' + videoNumber + '.webm');
	document.getElementById('videoSourceOgg').setAttribute('src','videos/' + videoNumber + '.ogg');
    document.getElementById("video").load();
    videos_seen.push(videoNumber);
	clearVideo();
}

function addMovingArea(areaObjects,fn) {
	var divBoxId = '#clickArea0';
	var upperLefts = [], lowerRights = [], areaMum = [], areaObjs = [], times = [], iArea = 0, iBlock = 0;
	video.play();
	var id = setInterval(show_moving_box,100);
	function show_moving_box() {
		for (i=0; i<2; i++) {
            for (j = 0; j < 2; j++) {
                areaObjs[i][j] = areaObjects[iBlock + i].movingCoordinates[iArea + j];
                upperLefts[i][j] = areaObjs[i][j].upperLeftCoordinates;
                lowerRights[i][j] = areaObjs[i][j].lowerRightCoordinates;
                times[i][j] = areaObjs[i][j].time;
            }

            var tVideo = video.currentTime;
            if (tVideo > times[i][0]) {
                if (tVideo < times[i][1]) {
                    var t = (video.currentTime - times[i][0]) / (times[i][1] - times[i][0]);
                    var upperLeft = [], lowerRight = [];
                    for (k = 0; k < 2; k++) {
                        upperLeft[i][k] = (upperLefts[i][1][k] * t + upperLefts[i][0][k] * (1 - t));
                        lowerRight[i][k] = (lowerRights[i][1][k] * t + lowerRights[i][0][k] * (1 - t));
                    }
                    clearVideo(false);
                    addVideoArea(upperLeft, lowerRight, 0);
                    // $(divBoxId).click(function() {temp_function(tVideo);});
                    $(divBoxId).click(fn);
                } else { // tVideo>time[1] so need to go to the next time interval
                    iArea += 1;
                    if (iArea > areaObjects.length - 2) {
                        clearInterval(id);
                        video.pause();
                    }
                }
            }
        }
	}
}


