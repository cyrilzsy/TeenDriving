<?
include 'login_DB.php';
?>

<?php if (isset($gender) && $gender=="male") echo "checked";?>
<?php if (isset($gender) && $gender=="female") echo "checked";?>
<?echo '"' . $yrsexp . '"';?>
<?echo '"' . $mosexp . '"';?>

<?
echo '#####';
echo '{';
echo '  "username":"' . $username . '",'; // add commas except for last item
echo '  "age":"' . $age . '",';
echo '  "nummisses":"' . $nummisses . '",';
echo '  "newuser":"' . $newuser . '",';
echo '  "avatar":"' . $avatar . '"';
echo '}';
?>
