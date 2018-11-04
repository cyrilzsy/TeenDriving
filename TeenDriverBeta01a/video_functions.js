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
	// divBox.onclick = fn;

	let divBoxId0 = 'clickArea';
	if (numArea>=0) {
		divBoxId0 += numArea;
	} else {
		divBoxId0 += n;
	}
	divBox.setAttribute("id",divBoxId0);
	let divBoxId = '#' + divBoxId0;
	$('#clickAreas').append(divBox); // use jQuery append() instead of HTML DOM appendChild()
	$(divBoxId).click(function(event) {fn(event)});

	show_box(divBoxId,upperLeftCoords,lowerRightCoords);
}

function show_box(divBoxId,upperLeftCoords,lowerRightCoords) {
	$(divBoxId).offset({top:upperLeftCoords[1]*videoHeight/100,left:upperLeftCoords[0]*videoWidth/100});
	$(divBoxId).height((lowerRightCoords[1] - upperLeftCoords[1])*videoHeight/100);
	$(divBoxId).width((lowerRightCoords[0] - upperLeftCoords[0])*videoWidth/100);

	hintLevelChange();
}

function addArrow(fn=function(){}) {
	let arrowUp = document.createElement('img');
	arrowUp.setAttribute("position", "absolute");
	arrowUp.setAttribute("z-index", "+1");
	arrowUp.setAttribute("src","Arrow/Up.png");
	arrowUp.setAttribute("id","ArrowUp");
	let arrowUpId = '#ArrowUp';


	let arrowDown = document.createElement('img');
	arrowDown.setAttribute("position", "absolute");
	arrowDown.setAttribute("z-index", "+1");
	arrowDown.setAttribute("src","Arrow/Down.png");
	arrowDown.setAttribute("id","ArrowDown");
	let arrowDownId = '#ArrowDown';


	let arrowLeft = document.createElement('img');
	arrowLeft.setAttribute("position", "absolute");
	arrowLeft.setAttribute("z-index", "+1");
	arrowLeft.setAttribute("src","Arrow/Left.png");
	arrowLeft.setAttribute("id","ArrowLeft");
	let arrowLeftId = '#ArrowLeft';


	let arrowRight = document.createElement('img');
	arrowRight.setAttribute("position", "absolute");
	arrowRight.setAttribute("z-index", "+1");
	arrowRight.setAttribute("src","Arrow/Right.png");
	arrowRight.setAttribute("id","ArrowRight");
	let arrowRightId = '#ArrowRight';

	$('#clickAreas').append(arrowUp);
	$('#clickAreas').append(arrowDown);
	$('#clickAreas').append(arrowLeft);
	$('#clickAreas').append(arrowRight);

	show_arrow(arrowUpId,arrowDownId,arrowLeftId,arrowRightId);

}

function show_arrow(UpId,DownId,LeftId,RightId){
	$(UpId).offset({top:0.1*videoHeight, left:0.45*videoWidth});
	$(UpId).height(0.2*videoHeight);
	$(UpId).width(0.1*videoWidth);

	$(DownId).offset({top:0.8*videoHeight, left:0.45*videoWidth});
	$(DownId).height(0.2*videoHeight);
	$(DownId).width(0.1*videoWidth);

	$(LeftId).offset({top:0.5*videoHeight, left:0.1*videoWidth});
	$(LeftId).height(0.1*videoHeight);
	$(LeftId).width(0.2*videoWidth);

	$(RightId).offset({top:0.5*videoHeight, left:0.7*videoWidth});
	$(RightId).height(0.1*videoHeight);
	$(RightId).width(0.2*videoWidth);
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

function addMovingArea(multipleAreaObjects,fn) {
	video.play();
	var iArea = [], maxTime = 0, areaObjs = {}, divBoxId = [];
	for (l=0; l<multipleAreaObjects.length; l++) {	
		iArea.push(0);
		areaObjs = multipleAreaObjects[l];
		maxTime = Math.max(maxTime,areaObjs[areaObjs.length-1].time);
		divBoxId[l] = '#clickArea' + l;
	}
	var id = setInterval(show_moving_box,100);

	function show_moving_box() {
		var tVideo = video.currentTime;
		if (tVideo>maxTime) {
			clearInterval(id);
			video.pause();			
		} else {
			var upperLefts = [], lowerRights = [], times = [], upperLeft = [], lowerRight = [];
			for (l=0; l<multipleAreaObjects.length; l++) {
				if (!!divBoxId[l]) {
					for (j=0; j<2; j++) {
						areaObjs = multipleAreaObjects[l][iArea[l]+j];
						upperLefts[j] = areaObjs.upperLeftCoordinates;
						lowerRights[j] = areaObjs.lowerRightCoordinates;
						times[j] = areaObjs.time;
					}
					if (tVideo>times[0]) {
						if (tVideo<times[1]) {
							var t = (video.currentTime - times[0])/(times[1] - times[0]);
							for (k=0; k<2; k++) {
								upperLeft[k] = (upperLefts[1][k]*t + upperLefts[0][k]*(1-t));
								lowerRight[k] = (lowerRights[1][k]*t + lowerRights[0][k]*(1-t));
							}
							$(divBoxId[l]).remove();
							addVideoArea(upperLeft,lowerRight,l,fn);
						} else { // tVideo>time[1] so need to go to the next time interval
							iArea[l] += 1;
							if (iArea[l]>multipleAreaObjects[l].length-2) {
								$(divBoxId[l]).remove();
								divBoxId[l] = '';
							}
						}
					}
				}
			}
		}
	}
}

