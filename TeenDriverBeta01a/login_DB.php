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

$newuser = "false";
if (!isset($_GET['userName'])) {
//$username = '';
} else {
  $username = $_GET['userName'];
  echo "<br>User name: " . $username . "<br>";
  $sql = 'SELECT * from USERS where USERNAME = "' . $username . '"';
  $ret = $db->query($sql);
  $row = $ret->fetchArray(SQLITE3_ASSOC);

  if($row<1) {
    $newuser = "true";
    echo "  User name not found, creating new record:<br>";
    $sql = "INSERT INTO USERS (ID,USERNAME) VALUES (NULL,'" . $username . "')";
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

    if (strlen($avatar)===0) {
      $avatar = print_r($row['AVATAR'], true);
    } else {
      $sql = 'UPDATE USERS set AVATAR = "' . $avatar . '" where USERNAME = "' . $username . '"';
      $ret = $db->exec($sql);
      if(!$ret) {
        echo "<br>Update AVATAR error<br>";
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
