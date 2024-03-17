async function classificar()
{
    var form =document.getElementById('form');
    var dados = new FormData(form);

    var promise = await fetch("classificar.php", {
        method: "POST",
        body: dados 
    });

    var resposta = await promise.json();

    alert(resposta);


}