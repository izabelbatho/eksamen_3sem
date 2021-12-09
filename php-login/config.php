<?php
/* Database credentials */
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'login');
 

?>

		<?php
			$conn = new mysqli("highgroundbyiza.dk.mysql:3306", "highgroundbyiza_dkspil", "root1234", "highgroundbyiza_dkspil");
			if($conn->connect_error)
			{
				die("Connection failed : ". $conn->connect_error);
			}
			echo "Connected successfully" . "<br/>" . "<br/>";
        ?>