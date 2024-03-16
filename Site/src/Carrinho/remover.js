async function remove(id){
    const dados = new FormData();
    dados.append('id', id);
  
    console.log(dados);
  
    const response = await fetch("remove.php", {
        method: "POST",
        body: dados
    });
  
    if (response.ok) {
      alert("Item removido");
    } else {
      alert("Não foi possível remover!");
    }
  }