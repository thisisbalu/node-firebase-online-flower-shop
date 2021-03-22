$(document).ready(function () {
 var prod = [];

		 	//we get parameter 'sku' from url on product_details.html
			 const queryString = window.location.search;
			 console.log(queryString);
		 
			 const urlParams = new URLSearchParams(queryString);
			 const sku = urlParams.get('sku')
			 console.log(sku);

	$.ajax({
			url: '/products/',
			type: 'GET',
			error: function (res) {
					alert("Something went wrong! Please try again!");
			},
			success: function (data) {
					// Here we call the api to get the selected product in db
					// and send the data to the following function to render to html

					$.fn.renderSelectedProduct(data);
					//prod = data;
			}
	});

	$.fn.renderSelectedProduct = function (products) {
		// just iterate the products and create the html into string
		// generaly the data that come from the api is in json format


		var renderedDetailsHTML = "";
		 for (var i = 0; i < products.length; i++) {
	
		 	var product = products[i];
		
	}
	if (sku.localeCompare(product.sku)) {
			
		//	var productDetailsPage = "product_details.html?sku=" + product.sku;
		renderedDetailsHTML = renderedDetailsHTML +
		'<div class="row">' + 
				 '<div class="col ml-4">' + 
				'<img class="img-fluid"' +
				 'src=  "' + product.image + '"' + '>' +
				 '</div>' +
				'<div class="col">' + 
				'<h3 class="my-3">Product Description</h3>' + 
				'<p>' + product.description.substring(0, 100) + '</p>' + 
				'<h3 class="my-3">Product Details</h3>' + 
				'<ul>' + 
					'<li>' + '<b>' + product.title.substring(0, 25) + '</b></li>' + 
					'<li>' + '$' + product.price + '</li>' + 
					'<li>' + product.quantity + ' items left ' + '</li>' + 
				'</ul>'+
				'<div>'+ '<br><br><br>' + 
				'<a href="#" class="btn btn-lg btn-warning">Add to cart</a>' + 
				'</div>'
				'</div>'+
	'</div>';

	}
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
	for (var i = 0; i < products.length; i++) {
			var product = products[i];
			renderedHTML = renderedHTML +
			'<div class="col mb-2 ml-3">' + 
			'<a href="#">' + 
						'<img class="img-fluid" width="100" height="100"' + 
						'src= "' +  product.image + '"' + '>' +
					'</a>' + 
					'<p>' +  product.title.substring(0, 25) + '</p>' + 
				
		'</div>';
	}

	//console.log(renderedHTML);
	// products is the ID i have attached to the html tag for class row check in shopping.html
	// html method of the jquery is quivalent of innerHTML of the vanilla javascript
	// this method overwrite the html of the existing one with renderedHTML string
	$("#relatedItems").html(renderedHTML);
};


});