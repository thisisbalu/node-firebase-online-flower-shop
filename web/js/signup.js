$(document).ready(function () {
	const USER_LOGGED_IN = localStorage.getItem('FLOWER-SHOP-LOGGED-IN-USER');
	if (!!USER_LOGGED_IN) {
		window.location.href = "/welcome.html";
	}

	//check email format
	var $email = $('#email');
	var re = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	$('#email').on('keyup', function () {
	if (re.test($email.val())) {
		$('#emailMessage').html('Perfect email format! Well done!').css('color', 'green');
		return true;
	} else
		$('#emailMessage').html('Please check the Email format').css('color', 'red');
			return false;
});

//check passwords equality
	$('#password, #confirm_password').on('keyup', function () {
		if ($('#password').val() == $('#confirm_password').val()) {
			$('#message').html('Passwords match! Well done!').css('color', 'green');
		} else
			$('#message').html('Passwords do not match').css('color', 'red');
	return;
	});

	$("#register").on("click", function () {
		console.log("login in!");
		$.fn.check();
	});

	$.fn.check = function () {
		var username = $("#uname").val();
		var email = $("#email").val();
		var password = $("#confirm_password").val();
		if (username.trim() == "" || email.trim() == "" || password.trim() == "") {
			alert("Please fill all the fields");
		
		}
		else {
			var payload = {
				userName: username,
				password: password,
				email: email
			}
			// First check if username already exists or not
			$.ajax({
				url: '/users/' + username,
				type: 'GET',
				error: function (res) {
					alert("Username and Password combination is wrong! Please try again!");
				},
				success: function (data) {
					// do not confuse with !!data it is just a way to check not null in java script
					// if you want to check more read about falsey values in javascript
					// here in the first ajax call i am checking is the user exist with the user name
					// if exists api is returning the users in array..
					// if array is empty user doesnot exist
					// if user does not exist then register user with given
					if (!!data && data.length == 0) {
						$.fn.addUser(payload);
					} else {
						alert("User already exists with the provided username, Please provide different username.");
					}
				}
			});
		}
	};

	$.fn.addUser = function (payload) {
		$.ajax({
			url: '/users/',
			type: 'POST',
			data: payload,
			error: function (res) {
				alert("Something went wrong! Please try again!");
			},
			success: function (data) {
				console.log(data);
				window.location.href = "/login.html";
			}
		});
	};
});

