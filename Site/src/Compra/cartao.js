var cartoes = {
    Visa: /^4[0-9]{12}(?:[0-9]{3})/,
    Mastercard: /^5[1-5][0-9]{14}/
};

function validar_compra() {	
	if(numero_cartao == '') return false;	
		
	

            
            
            function testarCC(nr, cartoes) {
                for (var cartao in cartoes) if (nr.match(cartoes[cartao])) return cartao;
                return false;
            }
            
            var valido = '4444555566667777';
            var invalido = '1234567890';
            
            [valido, invalido].forEach(function(teste){
               console.log(testarCC(teste, cartoes)); 
            });

	
	return alert("Compra Realizada");   

}
