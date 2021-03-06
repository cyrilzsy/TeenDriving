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
	let divBoxId0 = 'clickArea';
	if (numArea>=0) {
		divBoxId0 += numArea;
	} else {
		divBoxId0 += n;
	}
	let divBoxId = '#' + divBoxId0;
	var divBoxJQ = $(divBoxId);

	if (divBoxJQ.length==0) { // click area does not exist
		let divBox = document.createElement('div'); // new div.clickArea
		divBox.setAttribute("class","clickArea");
		divBox.setAttribute("position","absolute");
		divBox.setAttribute("z-index","+1");
		// divBox.onclick = fn;
		divBox.setAttribute("id",divBoxId0);
		$('#clickAreas').append(divBox); // use jQuery append() instead of HTML DOM appendChild()
		divBoxJQ = $(divBoxId);
		divBoxJQ.click(function(event) {fn(event)});
	}

	show_box(divBoxId,divBoxJQ,upperLeftCoords,lowerRightCoords);
}

function show_box(divBoxId,divBoxJQ,upperLeftCoords,lowerRightCoords) {
	divBoxJQ.offset({top:upperLeftCoords[1]*videoHeight/100,left:upperLeftCoords[0]*videoWidth/100});
	divBoxJQ.height((lowerRightCoords[1] - upperLeftCoords[1])*videoHeight/100);
	divBoxJQ.width((lowerRightCoords[0] - upperLeftCoords[0])*videoWidth/100);

	hintLevelChange(divBoxId);
}

function addArrow(arrowId,fn=function(){}) {
	if (arrowId == 'Up') {
        let arrowUp = document.createElement('img');
        set_arrow(arrowUp,'Up','ArrowUp');
    }else if (arrowId == 'Down') {
        let arrowDown = document.createElement('img');
        set_arrow(arrowDown,'Down','ArrowDown');
    }else if (arrowId == 'Left') {
        let arrowLeft = document.createElement('img');
        set_arrow(arrowLeft,'Left','ArrowLeft');
    }else if (arrowId == 'Right') {
        let arrowRight = document.createElement('img');
		set_arrow(arrowRight,'Right','ArrowRight');
    }
    function set_arrow(arrowName,Name='',Id='') {
        arrowName.setAttribute("position", "absolute");
        arrowName.setAttribute("z-index", "+1");
        arrowName.setAttribute("src", "Arrow/"+Name+".png");
        arrowName.setAttribute("id", Id);
        arrowName.setAttribute("class", "clickArea");
        $('#clickAreas').append(arrowName);
        $('#'+Id).click(function(event) {fn(event)});
    }

	show_arrow(arrowId);

}

function show_arrow(arrowId){
	if (arrowId == 'Up') {
		make_arrow('#ArrowUp',0.1,0.45,0.2,0.1);
    }else if (arrowId == 'Down') {
		make_arrow('#ArrowDown',0.8,0.45,0.2,0.1);
    }else if (arrowId == 'Left') {
		make_arrow('#ArrowLeft',0.5,0.1,0.1,0.2);
    }else if (arrowId == 'Right') {
		make_arrow('#ArrowRight',0.5,0.7,0.1,0.2);
    }
	function make_arrow(Id='',top=0,left=0,height=0,width=0) {
        $(Id).offset({top: top * videoHeight, left: left * videoWidth});
        $(Id).height(height * videoHeight);
        $(Id).width(width * videoWidth);
    }
}

function hintLevelChange(id='') {
	var hintLevel = document.getElementById("hintLevel").value;
	var alpha = 0.5*hintLevel/10;
	if (!id) {
		id = ".clickArea";
	}
	hintLevelCSS(id,alpha);
}

function hintLevelCSS(id,alpha) {
	var x = $(id);
	x.css({"background": "rgba(0,0,0," + alpha + ")", "color": "#f1f1f1"});
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
							// $(divBoxId[l]).remove();
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

