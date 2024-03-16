function gravar()
{
    var form = document.getElementById('formCadastro');
    var dados = new FormData(form);

    var senha = document.getElementById("senha").value;
    var conf_senha = document.getElementById("conf_senha").value;
    var cpf=document.getElementById("cpf").value;
    var nome=document.getElementById("nome").value.length;
    var email=document.getElementById("email").value.length;
    

    if (senha == conf_senha && validarCPF(cpf)==true && nome >=4 && email>=7) {
        
    fetch("gravar.php",{
        method: "POST",
        body: dados
    })
        alert("Enviado com sucesso")
    }

    else if(senha!=conf_senha ){
        alert("As senhas nao coincidem")
    }

    else if(validarCPF(cpf)==false){
        alert("CPF invalido")
    }

    else if(nome<=3){
        alert("O campo nome deve ser preenchido com 4 ou mais digitos")
    }

    else if(email<=7){
        alert("O campo email deve ser preenchido com 7 ou mais digitos")
    }
}