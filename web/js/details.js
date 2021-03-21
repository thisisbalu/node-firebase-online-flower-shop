$(document).ready(function () {
 var prod = [];
	$.ajax({
			url: '/products/',
			type: 'GET',
			error: function (res) {
					alert("Something went wrong! Please try again!");
			},
			success: function (data) {
					// Here we call the api to get all the products in db
					// and send the data to the following function to render to html
					$.fn.renderSelectedProduct(data);
					prod = data;
			}
	});
});