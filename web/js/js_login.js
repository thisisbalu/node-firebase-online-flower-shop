    
function check(form){

	var username = document.getElementById("uname");
	var password = document.getElementById("pass");

	if(username.value.trim() =="" || password.value.trim()==""){
	
			alert("No blank values allowed");
			return false;
	}
	else if(username.value === "admin" && password.value === "1234"){
	
			alert(`Welcome to Flower power!`);
							window.location.href = "/welcome.html";
			true;
	}
	else {
					alert("The username and password you've entered do not match. Try again.");
	}

}

