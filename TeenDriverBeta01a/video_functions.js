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

function addVideoArea(upperLeftCoords,lowerRightCoords,fn) {
// video_div
//   video
//     source
//   div#clickAreas
//     div.content#content0
//       a
//         div.clickArea#clickArea0
//     div.content#content1
//       a
//         div.clickArea#clickArea1

	let n = document.getElementsByClassName("clickArea").length; // number of areas

	let div = document.createElement('div'); // new div.content
	let a = document.createElement('a'); // new link
	let divBox = document.createElement('div'); // new div.clickArea
	a.appendChild(divBox);
	div.appendChild(a);
	$('#clickAreas').append(div); // use jQuery append() instead of HTML DOM appendChild()

	div.setAttribute('class','content');
	div.setAttribute('id','content' + n);

	a.setAttribute('href','#');
	a.onclick = fn;

	divBox.setAttribute("class","clickArea");
	divBox.setAttribute("id","clickArea" + n);
	divBox.setAttribute("position","absolute");
	divBox.setAttribute("z-index","+1");

	$("#clickArea" + n).offset({top:upperLeftCoords[1]*videoHeight/100,left:upperLeftCoords[0]*videoWidth/100});
	$("#clickArea" + n).height((lowerRightCoords[1] - upperLeftCoords[1])*videoHeight/100);
	$("#clickArea" + n).width((lowerRightCoords[0] - upperLeftCoords[0])*videoWidth/100);

	let x = document.getElementsByClassName("clickArea");
	let alpha = 0.5;
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

function hideInputBox(){
	document.getElementById('inputArea').innerHTML= "";
	document.getElementById('inputArea').outerHTML= "";
}

