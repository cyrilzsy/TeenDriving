<?
class MyDB extends SQLite3 {
  function __construct() {
    $this->open('mysqlitedb.db');
  }
}
// Use open method to initialize the DB
$db = new MyDB();
if (!$db) {
  echo "<br>OPEN DB error<br>";
  echo $db->lastErrorMsg();
}

if (isset($_GET['yrsexp'])) {
  $yrsexp = $_GET['yrsexp'];
} else {
  $yrsexp = '';
}

if (isset($_GET['age'])) {
  $age = $_GET['age'];
} else {
  $age = '';
}

if (isset($_GET['gender'])) {
  $gender = $_GET['gender'];
} else {
  $gender = '';
}

if (isset($_GET['mosexp'])) {
  $mosexp = $_GET['mosexp'];
} else {
  $mosexp = '';
}

if (isset($_GET['nummisses'])) {
  $nummisses = $_GET['nummisses'];
} else {
  $nummisses = '';
}

if (isset($_GET['avatar'])) {
  $avatar = $_GET['avatar'];
} else {
  $avatar = 'Girl';
}

if (!isset($_GET['userName'])) {
//$username = '';
} else {
  $username = $_GET['userName'];
  echo "<br>User name: " . $username . "<br>";
  $sql = 'SELECT * from USERS where USERNAME = "' . $username . '"';
  $ret = $db->query($sql);
  $row = $ret->fetchArray(SQLITE3_ASSOC);

  if($row<1) {
    echo "  User name not found, creating new record:<br>";
    $sql = "INSERT INTO USERS (ID,USERNAME,NUMMISSES) VALUES (NULL,'" . $username . "',0)";
    $ret = $db->exec($sql);
    if(!$ret) {
     echo "<br>INSERT INTO USERS error<br>";
     echo $db->lastErrorMsg();
    }
  } else {

    if (strlen($mosexp)===0) {
      $mosexp = print_r($row['MOSEXP'], true);
    } else {
      $sql = 'UPDATE USERS set MOSEXP = "' . $mosexp . '" where USERNAME = "' . $username . '"';
      $ret = $db->exec($sql);
      if(!$ret) {
        echo "<br>Update MOSEXP error<br>";
        echo $db->lastErrorMsg();
      }
    }

    if (strlen($gender)===0) {
      $gender = print_r($row['GENDER'], true);
    } else {
      $sql = 'UPDATE USERS set GENDER = "' . $gender . '" where USERNAME = "' . $username . '"';
      $ret = $db->exec($sql);
      if(!$ret) {
        echo "<br>Update GENDER error<br>";
        echo $db->lastErrorMsg();
      }
    }

    if (strlen($yrsexp)===0) {
      $yrsexp = print_r($row['YRSEXP'], true);
    } else {
      $sql = 'UPDATE USERS set YRSEXP = "' . $yrsexp . '" where USERNAME = "' . $username . '"';
      $ret = $db->exec($sql);
      if(!$ret) {
        echo "<br>Update YRSEXP error<br>";
        echo $db->lastErrorMsg();
      }
    }

    if (strlen($age)===0) {
      $age = print_r($row['AGE'], true);
    } else {
      $sql = 'UPDATE USERS set AGE = "' . $age . '" where USERNAME = "' . $username . '"';
      $ret = $db->exec($sql);
      if(!$ret) {
        echo "<br>Update AGE error<br>";
        echo $db->lastErrorMsg();
      }
    }

    $nummissesold = print_r($row['NUMMISSES'], true);
    if (strlen($nummisses)===0) {
      $nummisses = $nummissesold;
    } else {
      $nummisses = $nummisses + $nummissesold;
      $sql = 'UPDATE USERS set NUMMISSES = "' . $nummisses . '" where USERNAME = "' . $username . '"';
      $ret = $db->exec($sql);
      if(!$ret) {
        echo "<br>Update NUMMISSES error<br>";
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