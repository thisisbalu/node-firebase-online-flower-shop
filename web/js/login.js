// this function will be available on after loading all the html document
$(document).ready(function () {
	console.log("ready!");
	$("#login").on("click", function () {
		console.log("login in!");
		$.fn.check();
	});

	$.fn.check = function () {
		var tusername = $("#uname").val();
		var tpassword = $("#pass").val();
		var payload = {
			userName: tusername,
			password: tpassword
		}
		if (tusername.trim() == "" || tpassword.trim() == "") {
			alert("No blank values allowed");
			return false;
		}
		else {
			// Ajax call to call api
			$.ajax({
				// url of the api
				url: '/users/check',
				// method of api get or post or delete
				type: 'POST',
				// payload or data that is sent to node server
				data: payload,
				// if there is an error status code this function will be called by jquery
				error: function (res) {
					alert("Username and Password combination is wrong! Please try again!");
				},
				// of the success status code this function will be called
				// 200 is the status code of success
				// usually rest api sends us the code accordingly
				// in this case if we find the user with username and password it responds with 200 status code
				// refer to this api in the users.js
				success: function (data) {
					console.log(data);
					// once the user gets logged we are storing the user object in the browser storage
					// similar to cookie but more good than the cookie
					// you can check this value set in browser
					// chrome dev tools -> application -> in sotrage check local storage
					localStorage.setItem('user', JSON.stringify(data));
					window.location.href = "/welcome.html";
				}
			});
		}
	};

});