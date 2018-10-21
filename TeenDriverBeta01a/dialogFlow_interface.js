var mediaStart     = '<div class="media-left media-middle" style="padding-left:';
var mediaEnd       = 'class="media-object" style="width:40px"></div><div class="media-body" style="padding-left:20px"><div style="padding:15px; color:black;"';
var mediaEndForm   = 'class="media-object" style="width:40px"></div><div class="media-body" style="padding-left:20px" id="media-end-form"><div style="padding:15px; color:black;"';
var mediaLeftAunt  = mediaStart + '30px"><img src="Elder image.png"' + mediaEnd + 'class="speech-bubble-aunt">';
var mediaLeftMe    = mediaStart + ' 0px"><img src= "Girl image.png"' + mediaEnd + 'class="speech-bubble-me">';
var chatBreak      = "</div></div><hr>";
var mediaLeftForm  = mediaStart + ' 0px"><img src="Girl image.png" id="image-form"' + mediaEndForm + 'class="speech-bubble-me" id="speech-form">';
var speechObj = "";

var inputbox0 = '<form autocomplete="on" id="myForm" onsubmit="send()">' +
		'<input type="text" style="width:100%" id="input" name="input" autocomplete="on" autofocus>' +
	'</form>';
// var inputbox0 = '<p id="inputHeader">Input</p>' +
// 					'<form autocomplete="on" onsubmit="return ajaxit();" id="myForm" target="the_iframe">' +
// 						'<input type="text" style="width:100%" id="input" name="input" autocomplete="on">' +
// 						'<input id="submit_button" type="submit" onclick="send();hideInputBox();" value="Submit">' +
// 					'</form>' +
// 					'<iframe id="the_iframe" name="the_iframe" src="javascript:false" class="hidden"></iframe>';

var pauseVideoTime = 0.;
var numAreasFound = 0;
var startTime = 0;
var areasList = [];

function initializeVideoParameters() {
	pauseVideoTime = 0.;
	numAreas = 0;
	startTime = 0;
	areasList = [];
}

function sendToDialogFlow(text_in) {
	var input = "";
	var clickAreaResponse = '';
	$.ajax({
		type:        "POST",
		url:          baseUrl + "query/",
		contentType: "application/json; charset=utf-8",
		dataType:    "json",
		headers: {
			         "Authorization": "Bearer " + accessToken,
		},
		data:         JSON.stringify({
			query:    text_in,
			lang:    "en",
			contexts:[
			],
			sessionId: "0123456789ti",
		}),

		success: function(data) {
	 		let data_speech = data.result.speech;
			var speechSplit = splitStr(data_speech);
			var speech = speechSplit.text.replace(/yyy/g,"{").replace(/zzz/g,"}");
			var speechJSON = speechSplit.JSON.replace(/yyy/g,"{").replace(/zzz/g,"}");
			if (speechJSON.length>0) {
				try {
					speechObj = JSON.parse(speechJSON);
					console.log(speechObj);
					let tasks = speechObj.tasks;
					console.log(tasks);
					initializeVideoParameters();

					for (iTask=0; iTask<tasks.length; iTask++) {
						let task = tasks[iTask];
						console.log('task ' + iTask + ' of ' + tasks.length);
						console.log(task);
						let taskType = Object.getOwnPropertyNames(task)[0];
						console.log('taskType: ' + taskType);

						if (taskType=='callFunction') {
							input = callFunction(task,clickAreaResponse);
						}
					}
				}
				catch(err) {
					console.log(speech);
					console.log(err);
				}
			}
			setDialogBox(false,speech,text_in,input);
	 		setResponse(JSON.stringify(data, undefined, 2));
		},
		error: function(jqXHR) {
				setResponse(JSON.stringify(jqXHR, undefined, 2));
		}
	});
		setResponse("Loading...");	
}

function send(text="",start=false) {
	if (start) {
		let inputbox = '<p id="inputHeader">' + text + '</p>' + inputbox0;
		setDialogBox(start,'','','begin',inputbox);
	} else {
		var text_in = $("#input").val(); // get input text
	    $('#speech-form').remove(); // get rid of the old form and other HTML elements
	    $('#image-form').remove();
	    $('#media-end-form').remove();
	    sendToDialogFlow(text_in);
	}
}

function setDialogBox(start,speech,text_in,input,inputbox=inputbox0) {
    let response  = mediaLeftForm + inputbox;
    if (!start) {
    	response += chatBreak + mediaLeftAunt + speech + chatBreak + mediaLeftMe + text_in;
	} else {
	}
	response += "</div></div>";
    $('#dialog').prepend(response);
	$("#input").val(input);
	$('#input').focus();
		$("#dialog").scrollTop(0);

	let dialogWidth = parseInt($("#dialog")[0].clientWidth,10);
	let bubbles     = document.getElementsByClassName('speech-bubble-me');
	bubbles[bubbles.length - 1].style.width = dialogWidth - 120 + 'px';
	bubbles         = document.getElementsByClassName('speech-bubble-aunt');
	bubbles[bubbles.length - 1].style.width = dialogWidth - 120 + 'px';		
}

function setResponse(val) {                                // generic function to set the response
	// $("#response").text(val);                           // doesn't work when using sendIntent
	document.getElementById("response").value = val;
}

function splitStr(string) {
    var object = string.split("#####");
    var text = object[0];
    var JSON = "";
    if (object.length>1) {
	    JSON = object[1];
	};
    return {text: text, JSON: JSON};
}