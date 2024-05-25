<?php
require_once("listar.php");

$categoria = '';
$figuras = getFiguras($categoria);

echo "<pre>";
print_r($figuras);
echo "</pre>";
?>
