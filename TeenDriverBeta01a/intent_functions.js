function sendIntent() {
	var xhttp      = new XMLHttpRequest();
	var intentJSON = $("#response").val();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
	 		$("#serverResponse").val(this.status);
		}
	};
	xhttp.open("GET","save_intent.php?q=" + intentJSON,true);
	xhttp.send();
}

function getIntentInfo() {
	var xhttp = new XMLHttpRequest();
    var	url   = baseUrl + "intents/" + intentID + "?v=20150910";
//	var	url   = baseUrl2 + "projects/" + projectID + "/agents/intents/" + intentID;
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
	 		setResponse(this.responseText);
		}
	};
	xhttp.open("GET",url,true);
	xhttp.setRequestHeader("Content-Type","application/json; charset=utf-8");
    xhttp.setRequestHeader("Authorization","Bearer " + developerToken);
//	xhttp.setRequestHeader("Authorization","Bearer $(gcloud auth application-default print-access-token)");
	xhttp.send();
}

function getIntentSummaries() {
	$.ajax({
		type:        "GET",
//		url:         baseUrl + "intents/" + intentID + "?v=20150910",  // get specific intent
		url:         baseUrl + "intents?v=20150910",
		contentType: "application/json; charset=utf-8",
		dataType:    "json",
		headers: {
			         "Authorization": "Bearer " + developerToken
		},

		success: function(data) {
	 		setResponse(JSON.stringify(data, undefined, 2));
		},
		error: function(jqXHR) {
				setResponse(JSON.stringify(jqXHR, undefined, 2));
		}
	});
	setResponse("Loading...");
}

function ajaxit() {
    var iFrameWindow = document.getElementById("the_iframe").contentWindow;
    iFrameWindow.document.body.appendChild( document.getElementById("myForm").cloneNode(true));   
    var frameForm = iFrameWindow.document.getElementById("myForm");
    frameForm.onsubmit = null;
    frameForm.submit();
    return false;
}
