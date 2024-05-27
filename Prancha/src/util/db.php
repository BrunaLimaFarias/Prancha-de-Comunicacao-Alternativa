<?php

// Função para conectar ao banco de dados
function conectar_bd() {
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $database = "prancha_comunicacao";
    
    // Cria a conexão
    $conn = new mysqli($servername, $username, $password, $database);
    
    // Verifica a conexão
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    return $conn;
}
