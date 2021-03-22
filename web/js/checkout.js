var inputs = document.querySelectorAll("input");
console.log(inputs);

var pattern = {

	card_number: /^[0-9]{15,16}$/,            //only numbers can be entered, at least 15 simbol and 16 max simbol
	cvc: /^[0-9]{3,3}$/,                      //only three-digit numbers can be entered
	card_name: /^[A-Z]{3,15}\s[A-Z]{3,15}$/,  // uppercase only First name and Last name separated by space. Every name must be contain at least 3 to 15 letters
	expiration: /^([\d]{2,2}\/[\d]{2,2})$/,  // Must contain only 4 digits. 2 digist and 2 digist separated by a slash. Exm: 22/22
	name: /^[A-Z]{1,1}[a-z]{2,14}\s[A-Z]{1,1}[a-z]{2,14}$/, //name must be contain full name (First name+Last name).First letter in uppercase subsequent letter in lowcase. First name and last name separated by space.  
	city: /^[A-Z]{1,1}[a-z A-Z]+$/,
	postalcode: /^[A-Z]{1,1}[0-9]{1,1}[A-Z]{1,1}[0-9]{1,1}[A-Z]{1,1}[0-9]{1,1}$/,/* Every postale code must be contain: uppercase later, digital, uppercase later, digital, uppercase later, digital */
	province: /^[A-Z]{1,1}[a-z A-Z]+$/
}

function validate(field, regex) {
	if (regex.test(field.value)) {
		field.className = "valid";
	} else {
		field.className = "invalid";
	}
}
// document.querySelector("form").addEventListener("submit", function (e) {
// 	if (!validate()) {
// 			e.preventDefault();
// 	}
// });

inputs.forEach((input) => {
	input.addEventListener("keyup", (e) => {
		validate(e.target, pattern[e.target.attributes.name.value]);
	})
})

// ==========================function for button Continue=======================

//checkbox_form=document.querySelector('#chek_card');

$("#checkout").on('click', function () {
	console.log("Asasa");
	if (document.getElementById("firstName").value != ""
		&& document.getElementById("lastName").value != ""
		&& document.getElementById("cc-number").value != ""
		&& document.getElementById("cvc").value != ""
		&& document.getElementById("cc-name").value != ""
		&& document.getElementById("cc-expiration").value != ""
		&& document.getElementById("address").value != ""
		&& document.getElementById("country").value != ""
		&& document.getElementById("postalcode").value != ""
		&& document.getElementById("province").value != ""
		&& document.getElementById("myCheck").checked) {

		var firstName = $("#firstName").val();
		var lastName = $("#lastName").val();
		var cardNumber = $("#cc-number").val();
		var cvc = $("#cvc").val();
		var cardName = $("#cc-name").val();
		var expiry = $("#cc-expiration").val();
		var saddress = $("#address").val();
		var scountry = $("#country").val();
		var spostalcode = $("#postalcode").val();
		var sprovince = $("#province").val();

		var user = JSON.parse(localStorage.getItem('FLOWER-SHOP-LOGGED-IN-USER'));
		var cost = localStorage.getItem('FLOWER-SHOP-CART-COST');
		cost = Number(cost);

		var itemsInCart = localStorage.getItem('FLOWER-SHOP-CART');
		itemsInCart = JSON.parse(itemsInCart);
		var products = [];

		for (var i = 0; i < itemsInCart.length; i++) {
			var product = {};
			var item = itemsInCart[i];
			product.sku = item.sku;
			product.title = item.title;
			product.price = item.price;
			products.push(product);
		}

		var payload = {
			userName: user.userName,
			shipping: {
				name: firstName + ' ' + lastName,
				address: saddress,
				province: sprovince,
				country: scountry,
				postalCode: spostalcode
			},
			payment: {
				cardNumber: cardNumber,
				expiry: expiry,
				cvv: cvc,
				cardName: cardName
			},
			cost: cost,
			products: products
		};
		console.log(payload);
		$.ajax({
			url: '/orders/',
			type: 'POST',
			data: payload,
			error: function (res) {
				alert("Something went wrong! Please try again!");
			},
			success: function (data) {
				console.log(data);
				window.location.href = "/shopping.html";
			}
		});
	}
	else {
		alert("Please note that all nonoptional fields are required !!! ");
	}
});

$(document).ready(function () {
	function buttonClicked(e) {

	}
});


