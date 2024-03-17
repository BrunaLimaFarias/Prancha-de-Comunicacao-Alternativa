//exemplo pegar dados para o carrinho

<?php
function get_carrinho()
{
    global $conn;
    $query = "select * from Carrinho c inner join produtos p on c.id_produto = p.id";
    return $conn->query($query)->fetch_all(MYSQLI_ASSOC); // pega variavel conn do db.php
}
?>