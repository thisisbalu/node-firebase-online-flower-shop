$('#password, #confirm_password').on('keyup', function () {
	if ($('#password').val() == $('#confirm_password').val()) {
		$('#message').html('Passwords match! Well done!').css('color', 'green');
		
	} else 
		$('#message').html('Passwords do not match').css('color', 'red');
});


function check(form){

	var username = document.getElementById("uname");
	var email = document.getElementById("email");
	var password = document.getElementById("confirm_password");

	if(username.value.trim()=="" || email.value.trim()=="" || password.value.trim()==""){
	
			alert("Please fill all the fields");
			return false;
	}
	else{
	
			alert(`Successful registration!`);
							window.location.href = "/login.html";
			true;
	}

}

		