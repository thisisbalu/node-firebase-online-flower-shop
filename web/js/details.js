var selectedproduct = {};
$(document).ready(function () {

	var itemsInCart = localStorage.getItem('FLOWER-SHOP-CART');
	itemsInCart = JSON.parse(itemsInCart);
	$("#cartCount").html(!itemsInCart ? '(0)' : '(' + itemsInCart.length + ')');


	//we get parameter 'sku' from url on product_details.html
	const urlString = window.location.href;
	console.log(urlString);
	var url = new URL(urlString);
	const sku = url.searchParams.get("sku");
	console.log(sku);

	$.ajax({
		url: '/products/' + sku,
		type: 'GET',
		error: function (res) {
			alert("Something went wrong! Please try again!");
		},
		success: function (data) {
			// Here we call the api to get the selected product in db
			// and send the data to the following function to render to html

			$.fn.renderSelectedProduct(data);
		}
	});

	$.fn.renderSelectedProduct = function (products) {
		// just iterate the products and create the html into string
		// generaly the data that come from the api is in json format
		var renderedDetailsHTML = "";
		console.log(products);

		var product = products[0];
		selectedproduct = product;
		$("#title").html(product.title);

		//	var productDetailsPage = "product_details.html?sku=" + product.sku;
		renderedDetailsHTML = renderedDetailsHTML +
			'<div class="row">' +
			'<div class="col ml-4">' +
			'<img class="img-fluid"' +
			'src=  "' + product.image + '"' + '>' +
			'</div>' +
			'<div class="col">' +
			'<h3 class="my-3">Product Description</h3>' +
			'<p>' + product.description + '</p>' +
			'<h3 class="my-3">Product Details</h3>' +
			'<ul>' +
			'<li>' + '<b>' + product.title + '</b></li>' +
			'<li>' + '$ ' + product.price + '</li>' +
			'<li>' + product.quantity + ' items left ' + '</li>' +
			'<li> Height ' + product.shippingDetails.height + 'cms</li>' +
			'<li> Width ' + product.shippingDetails.height + 'cms</li>' +
			'<li> Weight ' + product.shippingDetails.height + 'gms</li>' +
			'</ul>' +
			'<div>' + '<br><br><br>' +
			'<button type="button" onclick="addToCart()" id="addToCart" class="btn btn-lg btn-warning">Add to cart</button>	' +
			'<button type="button" onclick="goToShop()" id="goToShop" class="btn btn-lg btn-warning"><a href="shopping.html" style="text-decoration:none; color:black">Continue shopping</a></button>	' +
			'<button type="button"  id="goToCart" class="btn btn-lg btn-warning"><a href="shopping_cart.html" style="text-decoration:none; color:black">Go to cart</a></button>	' +
			'</div>' +
			'</div>' +
			'</div>';

		console.log(renderedDetailsHTML);
		// this method overwrite the html of the existing one with renderedHTML string
		$("#details").html(renderedDetailsHTML);
	};


	//Display related items:
	$.ajax({
		url: '/products/',
		type: 'GET',
		error: function (res) {
			alert("Something went wrong! Please try again!");
		},
		success: function (data) {
			// Here we call the api to get all the products in db
			// and send the data to the following function to render to html
			$.fn.renderAllProducts(data);
		}
	});

	$.fn.renderAllProducts = function (products) {
		// just iterate the products and create the html into string
		// generaly the data that come from the api is in json format
		var renderedHTML = "";
		for (var i = 0; i < 6; i++) {
			var product = products[i];
			renderedHTML = renderedHTML +
				'<div class="col mb-2 ml-3">' +
				'<a href="#">' +
				'<img class="img-fluid" width="100" height="100"' +
				'src= "' + product.image + '"' + '>' +
				'</a>' +
				'<p>' + product.title.substring(0, 25) + '</p>' +
				'</div>';
		}

		//console.log(renderedHTML);
		// products is the ID i have attached to the html tag for class row check in shopping.html
		// html method of the jquery is quivalent of innerHTML of the vanilla javascript
		// this method overwrite the html of the existing one with renderedHTML string
		$("#relatedItems").html(renderedHTML);
	};

});

var addToCart = function () {
	var itemsInCart = localStorage.getItem('FLOWER-SHOP-CART');
	if (!itemsInCart) {
		var items = [];
		items.push(selectedproduct);
		localStorage.setItem('FLOWER-SHOP-CART', JSON.stringify(items));
		$("#cartCount").html(items.length);
	} else {
		var items = JSON.parse(itemsInCart);
		items.push(selectedproduct);
		localStorage.setItem('FLOWER-SHOP-CART', JSON.stringify(items));
		$("#cartCount").html(items.length);
	}
}; 

