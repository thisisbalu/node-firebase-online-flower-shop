$(document).ready(function () {
    var itemsInCart = localStorage.getItem('FLOWER-SHOP-CART');
	itemsInCart = JSON.parse(itemsInCart);
	$("#cartCount").html(!itemsInCart ? '(0)' : '(' + itemsInCart.length + ')');
    
    console.log("im in");

    var user = JSON.parse(localStorage.getItem('FLOWER-SHOP-LOGGED-IN-USER'));

    $.ajax({
        url: '/orders/' + user.userName,
        type: 'GET',
        error: function (res) {
            alert("Something went wrong! Please try again!");
        },
        success: function (data) {
            // Here we call the api to get all the products in db
            // and send the data to the following function to render to html
            $.fn.renderOrderHisotry(data);
        }
    });

    $.fn.renderOrderHisotry = function (history) {
        console.log(history);

        var orders = [];

        for (var i = 0; i < history.length; i++) {
            products = history[i].products;
            var order = {};
            for (var j = 0; j < products.length; j++) {
                order.name = products[j].title;
                order.date = history[i].createdOn;
                order.vendor = history[i].tracking.vendor;
                order.tracking = history[i].tracking.trackingNumber;
                order.cost = history[i].products[j].price;
                orders.push(order);
            }
        }

        console.log(orders);

        var renderedHTML = "";
        for (var i = 0; i < orders.length; i++) {
            renderedHTML = renderedHTML +
                '<tr>' +
                '<td>'+orders[i].name+'</td>' +
                '<td>'+orders[i].date+'</td>' +
                '<td>'+orders[i].vendor+'</td>' +
                '<td>'+orders[i].tracking+'</td>' +
                '<td class="text-right">$ '+orders[i].cost+'</td>' +
                '</tr>';
        }

        $("#orderHistory").html(renderedHTML);
    }
});