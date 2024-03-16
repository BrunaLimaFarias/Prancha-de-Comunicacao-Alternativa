async function getdata()
{
    var form =document.getElementById('form');
    var dados = new FormData(form);

    var promise = await fetch("getdata.php", {
        method: "POST",
        body: dados 
    });

    var resposta = await promise.json();

    alert(resposta);


}