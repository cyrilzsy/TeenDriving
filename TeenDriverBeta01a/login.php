<?
class MyDB extends SQLite3 {
  function __construct() {
	  $this->open('mysqlitedb.db');
  }
}
// Use open method to initialize the DB
$db = new MyDB();
if (!$db) {
  echo "<br>Open DB error<br>";
  echo $db->lastErrorMsg();
}

if (isset($_POST['comments'])) {
  $comments = $_POST['comments'];
} else {
  $comments = '';
}

if (!isset($_POST['userName'])) {
//$username = '';
} else {
  $username = $_POST['userName'];
  $sql =<<<EOF
    SELECT * from USERS where USERNAME = '$username';
EOF;
  $ret = $db->query($sql);
  $row = $ret->fetchArray(SQLITE3_ASSOC);

  if($row<1) {
    echo "  User name not found, creating new record:<br />\n";
  $sql =<<<EOF
    INSERT INTO USERS (ID,USERNAME) VALUES (NULL,'$username');
EOF;
    print_r($sql);
    $ret = $db->exec($sql);
    print_r($ret);
    if(!$ret) {
	   echo "<br>Insert error<br>";
       echo $db->lastErrorMsg();
    }
  } else {

    if (strlen($email)<2) {
      // echo "email:<br />";
      // $sql = 'SELECT EMAIL from SURVEY where USERNAME = "' . $username . '"';
      // $ret = $db->query($sql);
      // $row = $ret->fetchArray(SQLITE3_ASSOC);
      $email = print_r($row['EMAIL'], true);
      print_r($email);
    } else {
      echo "update or resave email: $email<br />";
      $sql = 'UPDATE SURVEY set EMAIL = "' . $email . '" where USERNAME = "' . $username . '"';
      $ret = $db->exec($sql);
      if(!$ret) {
        echo $db->lastErrorMsg();
      }
    }

    if (strlen($rating)===0) {
      $rating = print_r($row['RATING'], true);
    } else {
      $sql = 'UPDATE SURVEY set RATING = "' . $rating . '" where USERNAME = "' . $username . '"';
      $ret = $db->exec($sql);
      if(!$ret) {
         echo $db->lastErrorMsg();
      }
    }

    if (strlen($comments)<2) {
      // $sql = 'SELECT COMMENTS from SURVEY where USERNAME = "' . $username . '"';
      // $ret = $db->query($sql);
      // $row = $ret->fetchArray(SQLITE3_ASSOC);
      $comments = print_r($row['COMMENTS'], true);
    } else {
      $sql = 'UPDATE SURVEY set COMMENTS = "' . $comments . '" where USERNAME = "' . $username . '"';
      $ret = $db->exec($sql);
      if(!$ret) {
         echo $db->lastErrorMsg();
      }
    }
  }
}

$db->close();
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
			history.back();
		}
	</script>
</head>

<body>

<h3 style="display:none">Welcome <?php echo $_POST["userName"]; ?></h3>

<div>
    <p>Login information</p>
	 <form action="" method="post">
	  <div class="form-group">
	    <label for="userName">User name:</label>
	    <input type="text" class="form-control" id="userName" name="userName">
	  </div>
	  <div class="form-group">
	    <label for="age">Age:</label>
	    <input type="text" class="form-control" id="age" name="age">
	  </div>
	  <div class="form-group">
	    <label for="age">Gender:</label>
		<input type="radio" name="gender" value="male"> Male<br>
		<input type="radio" name="gender" value="female"> Female<br>
	  </div>
	  <div class="form-group">
	    <label for="age">Years experience:</label>
	    <input type="number" class="form-control" id="yrsexp" name="yrsexp">
	  </div>
	  <div class="form-group">
	    <label for="age">Months experience:</label>
		<input type="number" name="mosexp" min="1" max="12">
	  </div>
<!-- 	  <div class="checkbox">
	    <label><input type="checkbox"> Remember me</label>
	  </div> -->
	  <button type="submit" class="btn btn-default">Submit</button>
	</form> 
    <button type="button" class="btn btn-default" onclick="goBack()">Return</button>
</div>

</body>
</html> 