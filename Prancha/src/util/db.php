<?php

$servername = "localhost";
$username = "root";
$password = "root";
$database = "prancha_comunicacao";

// conexao
$conn = new mysqli($servername, $username, $password, $database);

// testa conexao
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
