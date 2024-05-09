// get figuras
<?php
require_once("../util/db.php");

function get_figuras()
{
    global $conn;
    $query = "SELECT * FROM lista_figuras";
    return $conn->query($query)->fetch_all(MYSQLI_ASSOC); // pega variavel conn do db.php
}
