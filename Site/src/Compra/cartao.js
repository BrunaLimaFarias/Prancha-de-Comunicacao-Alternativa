//cartoes aceitos
var cartoes_aceitos = {
    Visa: /^4[0-9]{12}(?:[0-9]{3})/,
    Mastercard: /^5[1-5][0-9]{14}/
};

function validar_cartao() {	
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

function validateCard(value) {
    // remove all non digit characters
    var value = value.replace(/\D/g, '');
    var sum = 0;
    var shouldDouble = false;
    // loop through values starting at the rightmost side
    for (var i = value.length - 1; i >= 0; i--) {
      var digit = parseInt(value.charAt(i));
  
      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }
  
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    
    var valid = (sum % 10) == 0;
    var accepted = false;
    
    // loop through the keys (visa, mastercard, amex, etc.)
    Object.keys(acceptedCreditCards).forEach(function(key) {
      var regex = acceptedCreditCards[key];
      if (regex.test(value)) {
        accepted = true;
      }
    });
    
    return valid && accepted;
  }
