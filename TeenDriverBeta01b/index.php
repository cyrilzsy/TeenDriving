<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/hopscotch/0.3.1/css/hopscotch.css">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/hopscotch/0.3.1/js/hopscotch.js"></script>
<script src="video_functions.js"></script>
<script src="tokens_and_IDs.js"></script>
<script src="callFunction.js"></script>
<script src="dialogFlow_interface.js"></script>

<link rel="stylesheet" href="styles.css">

<script>
	$(window).resize(function () {
		getwh();
	})
	$(document).ready(function() {
	    var video = document.getElementById("video");
		$('#video').on("loadeddata", function () {
			getwh();
			console.log('loadeddata');
		});
		getwh();

		let initialMessage = "";
		send(initialMessage,true);
		
		// $('#input').focus();
		$("#input").keypress(function(event) {
			if (event.which == 13) {
		    	$('#submit_button').click(); 
				event.preventDefault();
				send();
			}
		});
		$('#hintLevel').val(0);
	});

	var num_misses = 0;

	function count_misses(reset=false) {
		var text_misses = '';
		if (reset) {
			num_misses = 0;
		} else {
			num_misses++;
			text_misses = 'Number of misses: ' + num_misses;
		}
		$('#num_misses').text(text_misses);
	}

	function sendLevel() {
		let sliderLevel = document.getElementById("sliderLevel");
		let level = Math.round(sliderLevel.value);
		let levelText = ['Poor','Fair','Good'];
		$('#input').val(levelText[level]);
		clearVideo();
		send();
	}

	// var httpAddress = 'https://engineering.jhu.edu/tak/teendriver/';
	function userLogin() {
		var userName = $('#login').val();
        var xmlhttp = new XMLHttpRequest();

    	if ("withCredentials" in xmlhttp) {
    		console.log('okay');
    	} else {
    		console.log('not okay');
    	}

        xmlhttp.onreadystatechange = function() {
        	console.log('onreadystatechange, readyState = ' + this.readyState);
        	console.log('onreadystatechange, status = ' + this.status);
        	console.log('onreadystatechange, statusText = ' + this.statusText);
        	console.log('onreadystatechange, responseText = ' + this.responseText);
		    // console.log(this.getAllResponseHeaders());
            if (this.readyState == 4 && this.status == 200) {
	        	console.log('onreadystatechange, conditions true, responseText = ' + this.responseText);
                $('#loginResponse').text(this.responseText);
                alert(this.responseText);
                // document.getElementById("loginResponse").innerHTML = this.responseText;
                $('#loginResponseTextArea').val(this.responseText);
            }
        };
        // xmlhttp.open("GET", "login.php?userName=" + userName, true);
        xmlhttp.open("GET", "simple_test.php?userName=" + userName, true);
        xmlhttp.setRequestHeader("Accept","text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8");
        // xmlhttp.setRequestHeader("Connection","keep-alive");
        // xmlhttp.setRequestHeader("Host","engineering.jhu.edu");
        // xmlhttp.setRequestHeader("TE","Trailers");
        xmlhttp.setRequestHeader("Upgrade-Insecure-Requests","1");
        // xmlhttp.setRequestHeader("User-Agent","Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:63.0) Gecko/20100101 Firefox/63.0");
        xmlhttp.send();
		// xmlhttp.open("POST", "login.php", true);
		// xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		// xmlhttp.send("userName=" + userName);
    }

    function userLoginAJAX() {
		$.ajax({
			type:        "GET",
			url:         "simple_test.php",
			contentType: "application/json; charset=utf-8",
			dataType:    "json",
			headers: {
			},
	
			success: function(data) {
		 		console.log(JSON.stringify(data, undefined, 2));
			},
			error: function(jqXHR) {
				console.log(JSON.stringify(jqXHR, undefined, 2));
			}
		});
		console.log("Loading...");
    	// $.get("simple_test.php", function(data,status) {
    	// 	alert("data: " + data + "\nStatus: " + status);
    	// })
    }

</script>
</head>

<body>
    <div class="container-fluid">
    	<div class="row">
	    	<div class="col-sm-6" style="padding: 0px" id="video_div">
				<video id="video" width="100%" onclick="count_misses()">
			    	<source type="video/webm" src="videos/28560.webm" id="videoSourceWebm">
			    	<source type="video/ogg" src="videos/28560.ogg" id="videoSourceOgg">
					Your browser does not support HTML video.
				</video>
				<div id="clickAreas" style="position: absolute; left:0px; top:0px">
				</div>
			</div>
			<div class="col-sm-6" style="padding: 0px">
		    	<div class="col" id="dialog">
				</div>
			</div>
		</div>
		<div class="row">
			<div class = "col-sm-6" style="padding: 0px">
				<div>
					<p id='num_misses'></p>
				</div>
			</div>
			<div class="col-sm-6" style="padding: 0px">
				<div>
					<span>Select level with slider, then click:</span>
					<button type="button" onClick="sendLevel()">Begin or Restart</button>
				</div>
				<div>
					<span>Beginner &nbsp&nbsp</span>
					<input type="range" min="0" max="2" value="0" style="width:100px; display:inline; color:black" id="sliderLevel">
					<span>&nbsp&nbsp Advanced</span>
				</div>
				<div>
					<br>
					<span>If you need hints in finding the important areas, move the slider to the right:</span>
				</div>
				<div>
					<span>Invisible &nbsp&nbsp</span>
					<input type="range" min="0" max="10" value="0" style="width:100px; display:inline; color:black" id="hintLevel" oninput="hintLevelChange()">
					<span>&nbsp&nbsp Clearly visible</span>
				</div>

				<div>
					<br>
					<span>Information: </span>
					<button type="button" data-toggle="modal" data-target="#infoModal" target="_blank">Information</button>
				</div>
				<div>
					<br>
					<!-- input will submit with CR if it is the only text field in the form -->
					<form onsubmit="userLogin()">
						<span>Login here: </span>
						<input type="text" id="login" value="Bob">
						<button type="submit">Submit</button>
					</form>
				</div>
				<br>
				<div id="loginResponse"><b>Login info will appear here ...</b></div>
				<textarea rows="5" id="loginResponseTextArea"  style="width:100%"></textarea>
			</div>
		</div>
	</div>

	<div id="infoModal" class="modal fade" role="dialog">
	  <div class="modal-dialog">
	    <!-- Modal content-->
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal">&times;</button>
	        <h4 class="modal-title">Login</h4>
	      </div>
	      <div class="modal-body">
	        <h4>Scientific authors and contributors:</h4>
	        <h4>Johnathon Ehsani, PhD</h4>
	        <h4>Tak Igusa, PhD</h4>
	        <h4>Siyao Zhu</h4>
	        <br />
	        <h5>App designers:</h5>
	        <h5>Tak Igusa and Siyao Zhu</h5>
	        <br />

	        <h4>DISCLAIMER</h4>
	        <p>
	          The Authors provides the App and the services, information, content and/or data (collectively, “Information”) contained therein for informational purposes only.
	        </p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	      </div>
	    </div>
	  </div>
	</div>

	<hr>
	<p>Response from Dialogflow (you can ignore this technical chatter): <span id="intentName"><b>Intent Name</b></span></p>
	<span>Administrator link: <a href="https://engineering.jhu.edu/tak/teendriver/db.php">database</a></span>
	<hr>

	<!--<form autocomplete="on" onsubmit="return ajaxit();" id="myForm" target="the_iframe">-->
		<!--<input type="text" style="width:100%" id="input" name="input" autocomplete="on"></input>-->
	    <!--<button id="submit_button" type="submit" class="hidden"></button>-->
	<!--</form>-->

	<!--<iframe id="the_iframe" name="the_iframe" src="javascript:false" class="hidden"></iframe>-->

    <div class="container-fluid">
    	<div class="row">
			<div class = "col-sm-6" style="padding: 0px">
				<p>Speech text:</p>
				<textarea class="form-control" rows="5" style="width:100%" id="responseSpeechText"></textarea>
			    <br><p>Full JSON:</p>
				<textarea class="form-control" rows="30" style="width:100%" id="response"></textarea>
			</div>
			<div class = "col-sm-6" style="padding: 0px">
				<p>Speech JSON:</p>
				<textarea class="form-control" rows="45" style="width:100%" id="responseSpeechJSON"></textarea>
			</div>
		</div>
	</div>

</body>
</html>