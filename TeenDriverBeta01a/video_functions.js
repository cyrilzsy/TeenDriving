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

function addVideoArea(upperLeftCoords,lowerRightCoords,numArea,fn) {
// video_div
//   video
//     source
//   div#clickAreas
//     div.clickArea#clickArea0
//     div.clickArea#clickArea1
// [don't use <a> because you can see the link]

	let n = document.getElementsByClassName("clickArea").length; // number of areas

	// let div = document.createElement('div'); // new div.content
	// let a = document.createElement('a'); // new link
	let divBox = document.createElement('div'); // new div.clickArea
	// a.appendChild(divBox);
	// div.appendChild(a);
	// $('#clickAreas').append(div); // use jQuery append() instead of HTML DOM appendChild()

	// div.setAttribute('class','content');
	// div.setAttribute('id','content' + n);
	// div.setAttribute('style','width:0px');
	// div.setAttribute('style','height:0px');

	// a.setAttribute('href','#');
	// a.onclick = fn;

	divBox.setAttribute("class","clickArea");
	divBox.setAttribute("position","absolute");
	divBox.setAttribute("z-index","+1");
	divBox.onclick = fn;

	let divBoxId0 = 'clickArea';
	if (!!numArea) {
		divBoxId0 += numArea;
	} else {
		divBoxId0 += n;
	}
	divBox.setAttribute("id",divBoxId0);
	let divBoxId = '#' + divBoxId0;
	$('#clickAreas').append(divBox); // use jQuery append() instead of HTML DOM appendChild()

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

