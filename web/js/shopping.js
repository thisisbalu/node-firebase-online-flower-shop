var allProducts = [];
$(document).ready(function () {
    var itemsInCart = localStorage.getItem('FLOWER-SHOP-CART');
    itemsInCart = JSON.parse(itemsInCart);
    $("#cartCount").html(!itemsInCart ? '(0)' : '(' + itemsInCart.length + ')');

    $.ajax({
        url: '/products/',
        type: 'GET',
        error: function (res) {
            alert("Something went wrong! Please try again!");
        },
        success: function (data) {
            // Here we call the api to get all the products in db
            // and send the data to the following function to render to html
            allProducts = data;
            $.fn.renderAllProducts(data);
        }
    });



    $.fn.renderAllProducts = function (products) {
        // just iterate the products and create the html into string
        // generaly the data that come from the api is in json format
        var renderedHTML = "";
        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            var productDetailsPage = "product_details.html?sku=" + product.sku;
            renderedHTML = renderedHTML +
                '<div class="col-sm mb-3">' +
                '<div class="card" style="width: 18rem;">' +
                '<img style="width: 286 !important; height: 100% !important;" class="card-img-top"' +
                'src=  "' + product.image + '"' +
                'alt="Card image cap">' +
                '<div class="card-body">' +
                '<h5 class="card-title"> ' + product.title.substring(0, 25) + ' </h5>' +
                '<p class="card-text"> ' + product.description.substring(0, 100) + '... </p>' +
                '<a href="' + productDetailsPage + '"   onclick="showDetails(this)"" class="btn btn-warning">View Details</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
        }
        // products is the ID i have attached to the html tag for class row check in shopping.html
        // html method of the jquery is quivalent of innerHTML of the vanilla javascript
        // this method overwrite the html of the existing one with renderedHTML string
        $("#products").html(renderedHTML);
    };

});

$("#search").on("click", function () {
    console.log("searching...");
    var searchText = $("#name-to-find").val();
    console.log(searchText);
    console.log(allProducts);
    var searchedProducts = allProducts.filter(function (el) {
        return el.title.toLowerCase().includes(searchText.toLowerCase());
    });
    $.fn.renderAllProducts(searchedProducts);
});

$('#name-to-find').on('keyup', function () {
    var searchText = $("#name-to-find").val();
    if(!searchText) {
        $.fn.renderAllProducts(allProducts)
    } 
});