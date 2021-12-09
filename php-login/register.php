<?php
session_start();
// Include config file
require_once "config.php";
 
// Define variables and initialize with empty values
$username = $password = $confirm_password = "";
$username_err = $password_err = $confirm_password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Validate username
    if(empty(trim($_POST["username"]))){
        $username_err = "Venligst indtast et brugernavn.";
    } elseif(!preg_match('/^[a-zA-Z0-9_]+$/', trim($_POST["username"]))){
        $username_err = "Brugernavn kan kun indholde bogstaver, tal eller _ .";
    } else{
        
        // Prepare a select statement

        $sql = $conn->prepare("SELECT id FROM users WHERE username = ?");
        $sql->bind_param("s", $param_username);
        $param_username = trim($_POST["username"]);
     // Attempt to execute the prepared statement
     if($sql->execute()){
        /* get result */
        $sql->get_result();
        
        if($sql->num_rows == 1){
            $username_err = "Dette brugernavn er allerede taget.";
        } else{
            $username = trim($_POST["username"]);
        }
    } else{
        echo "Hovsa! noget gik galt. Prøv igen senere.";
    }
        
    }
    
    // Validate password
    if(empty(trim($_POST["password"]))){
        $password_err = "Venligst udfyld kodeord.";     
    } elseif(strlen(trim($_POST["password"])) < 6){
        $password_err = "Dit kodeord skal bestå af mindst 6 tegn.";
    } else{
        $password = trim($_POST["password"]);
    }
    
    // Validate confirm password
    if(empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = "Bekræft venligst dit kodeord.";     
    } else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($password_err) && ($password != $confirm_password)){
            $confirm_password_err = "Kodeordene er ikke ens.";
        }
    }
    
    // Check input errors before inserting in database
    if(empty($username_err) && empty($password_err) && empty($confirm_password_err)){
        
        // Prepare an insert statement
        $sql = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
         
         // Bind variables to the prepared statement as parameters
            
         $sql->bind_param("ss", $username, $param_password);
            
         // Set parameters
         $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
         
         // Attempt to execute the prepared statement
         if($sql->execute()){
            $_SESSION['loggedin']=true;
             $_SESSION['username']=$username;
             // Redirect to game page
             header("location: spil.php");
         } else{
             echo "Hovsa! Noget gik galt. Prøv igen senere.";
         }
       
    }
    
    // Close connection
    $conn->close();
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Up</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <link rel="stylesheet" href="web/style.css">

   
</head>
<body>
    <div class="wrapper">
        <h2>Opret dig</h2>
        <p>Udfyld venligst denne form for at oprette en konto.</p>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="form-group">
                <label>Brugernavn</label>
                <input type="text" name="username" class="form-control <?php echo (!empty($username_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $username; ?>">
                <span class="invalid-feedback"><?php echo $username_err; ?></span>
            </div>    
            <div class="form-group">
                <label>Kodeord</label>
                <input type="password" name="password" class="form-control <?php echo (!empty($password_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $password; ?>">
                <span class="invalid-feedback"><?php echo $password_err; ?></span>
            </div>
            <div class="form-group">
                <label>Bekræft kodeord</label>
                <input type="password" name="confirm_password" class="form-control <?php echo (!empty($confirm_password_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $confirm_password; ?>">
                <span class="invalid-feedback"><?php echo $confirm_password_err; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Opret">
                <input type="reset" class="btn btn-secondary ml-2" value="Reset">
            </div>
            <p>Har du allerede en konto? <a href="login.php">Login her</a>.</p>
        </form>
    </div>    
</body>
</html>