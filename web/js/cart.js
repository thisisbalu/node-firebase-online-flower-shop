var allCartItems = [];

$(document).ready(function () {
    var itemsInCart = localStorage.getItem('FLOWER-SHOP-CART');
    itemsInCart = JSON.parse(itemsInCart);
    $("#cartCount").html(!itemsInCart ? '(0)' : '(' + itemsInCart.length + ')');
    if (itemsInCart) {
        allCartItems = itemsInCart;
    }
    renderHTML(allCartItems);
});

function deleteItem(ele) {
    const sku = ele.id;
    var newArray = allCartItems.filter(function (el) {
        return el.sku !== sku;
    });
    allCartItems = newArray;
    localStorage.setItem('FLOWER-SHOP-CART', JSON.stringify(allCartItems));
    renderHTML(allCartItems);
}

function renderHTML(products) {
    var renderedHTML = "";
    var shipping = 7;
    var totalCost = 0;
    for (var i = 0; i < products.length; i++) {
        var item = products[i];
        renderedHTML = renderedHTML +
            '<tr>' +
            '<td><img src="' + item.image + '" style=" height: 100px;" /> </td>' +
            '<td>' + item.title + '</td>' +
            '<td>' + item.quantity + '</td>' +
            '<td class="text-right">$ ' + item.price + '</td>' +
            '<td class="text-right"><button class="btn btn-sm btn-danger" id="' + item.sku + '" onclick="deleteItem(this)"><i class="fa fa-trash"></i>' +
            '</button> </td>' +
            '</tr>';
        totalCost = totalCost + item.price;
    }
    var tax = totalCost * (15 / 100);
    var subTotalHTML = '<tr>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td>Sub-Total</td>' +
        '<td class="text-right">$ ' + totalCost.toFixed(2) + '</td>' +
        '</tr>';
    var shippingHTML = '<tr>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td>Shipping</td>' +
        '<td class="text-right">$ ' + shipping.toFixed(2) + '</td>' +
        '</tr>';
    var taxHTML = '<tr>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td>Taxes</td>' +
        '<td class="text-right">$ ' + tax.toFixed(2) + '</td>' +
        '</tr>';
    var total = totalCost + shipping + tax;
    var totalHTML = '<tr>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td>Total</td>' +
        '<td class="text-right">$ ' + total.toFixed(2) + '</td>' +
        '</tr>';
    $("#cartBody").html(renderedHTML);
    $("#cartBody").append(subTotalHTML);
    $("#cartBody").append(shippingHTML);
    $("#cartBody").append(taxHTML);
    $("#cartBody").append(totalHTML);
    localStorage.setItem('FLOWER-SHOP-CART-COST', total.toString());

}