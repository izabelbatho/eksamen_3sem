<?php session_start();?>
<?php require_once('includes/header.php'); ?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="main.js" defer></script> <!-- Når man bruger "defer" kan man sætte script i header i stedet for i bunden af body-->
    <link rel="stylesheet" href="web/style.css">
</head>
<body>
    <h1>Velkommen til unicloud, <?php echo $_SESSION['username']; ?>!</h1>

    <h2>Brug piltasterne til at få unicloud i mål</h2>
    <h3 id="score"></h3>

    <center>
        <canvas width="1000" height="600">
        </canvas>
    </center>
    <script src ="noscroll.js"></script>
</body>
</html>
<?php require_once('includes/footer.php'); ?>