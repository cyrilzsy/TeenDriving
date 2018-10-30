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

if (isset($_POST['erase'])) {
  echo "<br>Erase<br>";
  $sql =<<<EOF
    DROP            TABLE           USERS;
EOF;
  $ret = $db->exec($sql);
  if (!$ret) {
  	echo "<br>Erase table error<br>";
    echo $db->lastErrorMsg();
   }
}

if (isset($_POST['init'])) {
  echo "<br>Initialize<br>";
  $sql =<<<EOF
    CREATE          TABLE           USERS
    (ID             INTEGER PRIMARY KEY AUTOINCREMENT,
    USERNAME        TEXT            NOT NULL,
    AGE             INT,
    GENDER          TEXT,
    YRSEXP          INT,
    MOSEXP          INT);
EOF;
  $ret = $db->exec($sql);
  if (!$ret) {
  	echo "<br>Create table error<br>";
    echo $db->lastErrorMsg();
   }

// Create records
  echo "<br>Create records<br>";
  $sql =<<<EOF
    INSERT INTO USERS (ID,USERNAME,AGE,GENDER,YRSEXP,MOSEXP)
    VALUES (1, 'Mary', 17, 'female', 0, 2);
    INSERT INTO USERS (ID,USERNAME,AGE,GENDER,YRSEXP,MOSEXP)
    VALUES (2, 'Joe', 18, 'male', 0, 8);
EOF;
  $ret = $db->exec($sql);
  if(!$ret) {
  	echo "<br>Create records error<br>";
    echo $db->lastErrorMsg();
  }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <title>Teendriver app: Database</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>

<body>
  <div class="container-fluid" style="margin-top:40px">
    <h4 class="modal-title">Database</h4>
	<form action="https://engineering.jhu.edu/tak/teendriver/db.php" method="post">
	    <div class="form-group">
	        <button type="submit" class="btn btn-sm" name="init">Initialize the database</button>
      </div>
      <div class="form-group">
	        <button type="submit" class="btn btn-sm" name="erase">Erase the database</button>
		 </div>
	</form> 
  </div>

  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>User name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Yrs exp</th>
          <th>Mos exp</th>
        </tr>
      </thead>
      <tbody>
<?
$sql =<<<EOF
  SELECT * from USERS;
EOF;

$ret = $db->query($sql);
while($row = $ret->fetchArray(SQLITE3_ASSOC) ) {
  echo "<tr>\n";
  echo "<td>". $row['ID']       ."</td>\n";
  echo "<td>". $row['USERNAME'] ."</td>\n";
  echo "<td>". $row['AGE']      ."</td>\n";
  echo "<td>". $row['GENDER']   ."</td>\n";
  echo "<td>". $row['YRSEXP']   ."</td>\n";
  echo "<td>". $row['MOSEXP']   ."</td>\n";
  echo "</tr>\n";
}
$db->close();
?>
      </tbody>
  	</table>
  </div>
</body>

</html>
