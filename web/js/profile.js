var users = {};
$(document).ready(function () {
	var itemsInCart = localStorage.getItem('FLOWER-SHOP-CART');
	itemsInCart = JSON.parse(itemsInCart);
	$("#cartCount").html(!itemsInCart ? '(0)' : '(' + itemsInCart.length + ')');

	var users = localStorage.getItem('FLOWER-SHOP-LOGGED-IN-USER');
	users = JSON.parse(users);
	console.log(users);

	Object.keys(users).forEach(key => {
		console.log(users[key]);
	});

		//$("#userId").html(users._id);
		$("#userName").html(users.userName);
		$("#firstName").html(users.firstName);
		$("#lastName").html(users.lastName);
		$("#email").html(users.email);
		$("#phone").html(users.phone);
		$("#address").html(users.address);
		$("#password").html(users.password);

// 		<div class="row" id="userName">
// 		<div class="col-md-6">
// 				<label>First Name</label>
// 		</div>
// 		<div class="col-md-6">
// 				<p>Kshiti</p>
// 		</div>
// </div>
});