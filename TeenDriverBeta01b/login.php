<?
include 'login_DB.php';
?>

<html>
<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script>
		$(document).ready(function() {
			// setTimeout(goBack,2000);
		})

		function goBack() {
			// history.back();
      history.go('https://engineering.jhu.edu/tak/teendriver/index.html'); // doesn't work
		}
	</script>
</head>

<body>

<h3 style="display:none">Welcome <?php echo $_GET["userName"]; ?></h3>

<div>
  <h3>Login information</h3>
	 <form action="" method="get">
	  <div class="form-group">
	    <label for="userName">User name:</label>
	    <input type="text" class="form-control" id="userName" name="userName" value=<?echo '"' . $username . '"';?> >
	  </div>
	  <div class="form-group">
	    <label for="age">Age:</label>
	    <input type="text" class="form-control" id="age" name="age" value=<?echo '"' . $age . '"';?> >
	  </div>
	  <div class="form-group">
	    <label for="age">Gender:&nbsp</label>
		<input type="radio" name="gender" value="male" <?php if (isset($gender) && $gender=="male") echo "checked";?> >&nbsp Male &nbsp 
		<input type="radio" name="gender" value="female" <?php if (isset($gender) && $gender=="female") echo "checked";?> >&nbsp Female<br>
	  </div>
	  <div class="form-group">
	    <label for="age">Years experience:</label>
	    <input type="number" class="form-control" id="yrsexp" name="yrsexp" value=<?echo '"' . $yrsexp . '"';?> >
	  </div>
	  <div class="form-group">
	    <label for="age">Months experience:</label>
		<input type="number" name="mosexp" min="1" max="12" value=<?echo '"' . $mosexp . '"';?> >
	  </div>
    <div class="form-group">
      <label for="avatar">Avatar:&nbsp</label>
    <input type="radio" name="avatar" value="avatar_1" <?php if (isset($avatar) && $avatar=="avatar_1") echo "checked";?> >&nbsp<img src="images/avatar_1 image.png" class="media-object" style="width:40px; display:inline">&nbsp&nbsp&nbsp
    <input type="radio" name="avatar" value="avatar_2" <?php if (isset($avatar) && $avatar=="avatar_2") echo "checked";?> >&nbsp<img src="images/avatar_2 image.png" class="media-object" style="width:40px; display:inline">&nbsp&nbsp&nbsp
    <input type="radio" name="avatar" value="avatar_3" <?php if (isset($avatar) && $avatar=="avatar_3") echo "checked";?> >&nbsp<img src="images/avatar_3 image.png" class="media-object" style="width:40px; display:inline">&nbsp&nbsp&nbsp
    <input type="radio" name="avatar" value="avatar_4" <?php if (isset($avatar) && $avatar=="avatar_4") echo "checked";?> >&nbsp<img src="images/avatar_4 image.png" class="media-object" style="width:40px; display:inline">&nbsp&nbsp&nbsp
    <input type="radio" name="avatar" value="avatar_5" <?php if (isset($avatar) && $avatar=="avatar_5") echo "checked";?> >&nbsp<img src="images/avatar_5 image.png" class="media-object" style="width:40px; display:inline">&nbsp&nbsp&nbsp
    <input type="radio" name="avatar" value="avatar_6" <?php if (isset($avatar) && $avatar=="avatar_6") echo "checked";?> >&nbsp<img src="images/avatar_6 image.png" class="media-object" style="width:40px; display:inline">&nbsp&nbsp&nbsp
    <input type="radio" name="avatar" value="avatar_7" <?php if (isset($avatar) && $avatar=="avatar_7") echo "checked";?> >&nbsp<img src="images/avatar_7 image.png" class="media-object" style="width:40px; display:inline">&nbsp&nbsp&nbsp
    <input type="radio" name="avatar" value="avatar_8" <?php if (isset($avatar) && $avatar=="avatar_8") echo "checked";?> >&nbsp<img src="images/avatar_8 image.png" class="media-object" style="width:40px; display:inline">&nbsp&nbsp&nbsp
    <input type="radio" name="avatar" value="avatar_9" <?php if (isset($avatar) && $avatar=="avatar_9") echo "checked";?> >&nbsp<img src="images/avatar_9 image.png" class="media-object" style="width:40px; display:inline">&nbsp&nbsp&nbsp
    <input type="radio" name="avatar" value="avatar_10" <?php if (isset($avatar) && $avatar=="avatar_10") echo "checked";?> >&nbsp<img src="images/avatar_10 image.png" class="media-object" style="width:40px; display:inline">&nbsp&nbsp&nbsp
    <input type="radio" name="avatar" value="avatar_11" <?php if (isset($avatar) && $avatar=="avatar_11") echo "checked";?> >&nbsp<img src="images/avatar_11 image.png" class="media-object" style="width:40px; display:inline">&nbsp&nbsp&nbsp
    <input type="radio" name="avatar" value="avatar_12" <?php if (isset($avatar) && $avatar=="avatar_12") echo "checked";?> >&nbsp<img src="images/avatar_12 image.png" class="media-object" style="width:40px; display:inline">&nbsp&nbsp&nbsp
    <input type="radio" name="avatar" value="avatar_13" <?php if (isset($avatar) && $avatar=="avatar_13") echo "checked";?> >&nbsp<img src="images/avatar_13 image.png" class="media-object" style="width:40px; display:inline">&nbsp&nbsp&nbsp
    <input type="radio" name="avatar" value="avatar_14" <?php if (isset($avatar) && $avatar=="avatar_14") echo "checked";?> >&nbsp<img src="images/avatar_14 image.png" class="media-object" style="width:40px; display:inline">&nbsp&nbsp&nbsp
    <input type="radio" name="avatar" value="avatar_15" <?php if (isset($avatar) && $avatar=="avatar_15") echo "checked";?> >&nbsp<img src="images/avatar_15 image.png" class="media-object" style="width:40px; display:inline">&nbsp&nbsp&nbsp
    <input type="radio" name="avatar" value="Girl" <?php if (isset($avatar) && $avatar=="Girl") echo "checked";?> >&nbsp<img src="images/Girl image.png" class="media-object" style="width:40px; display:inline">&nbsp&nbsp&nbsp
    <input type="radio" name="avatar" value="Elder" <?php if (isset($avatar) && $avatar=="Elder") echo "checked";?> >&nbsp<img src="images/Elder image.png" class="media-object" style="width:40px; display:inline"><br>
    </div>
	  <button type="submit" class="btn btn-default">Submit</button>
	 </form> 
   <div>
    <p><b>Number of misses: <?php echo $nummisses;?></b></p>
  </div>
   <!-- <button type="button" class="btn btn-default" onclick="goBack()">Return</button> -->
  <a href="index.html">Return</a>
  <br>
  <a href="db.php">Administrators only</a>
  </div>

</body>
</html> 