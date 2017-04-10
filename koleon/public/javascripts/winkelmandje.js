/*
	This js file is used on the winkemandje.jade page in order to fill the cart with chosen products and to delete or order these products
*/
// When a price has been clicked on, activate its modal
function activateModal(id, productName, price, description, image, cookieName) {
    var modal = document.getElementById('myModal');
    var modalheader = document.getElementById('modalheadertext');
    var modalbody = document.getElementById('modaltext');
    var modalimg = document.getElementById('modalimg');
    var btn = document.getElementById(id);
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    var modalbestel = document.getElementById("modalbestel");

    modalheader.innerHTML = productName;
    modalbody.innerHTML = description + "<br><br>Prijs: €" + price + "-";
    modalimg.src = "images/products/" + image;

    // When a user clicks 'delete from shopping cart' close the modal. This function is still in development
    modalbestel.onclick = function () {
        modal.style.display = "none";
        deleteProduct();
    }

    // Remove cookie of selected product to delete from cart
    function deleteProduct() {
        document.cookie = cookieName + "=; expires=Thu, 18 Dec 2014 12:00:00 UTC;path=/";
        window.location.reload();
    }

    // When the user clicks the close button, close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks outside the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

document.getElementById("afrekenen").addEventListener("click", function () {
    bevestigAankoop();
});

// Check if user wants to order and if so, perform the order
function bevestigAankoop() {
    var modal = document.getElementById('afrekenBevestiging');
    var modalbody = document.getElementById('modaltext');
    var span = document.getElementsByClassName("close")[0];
    var nietBevestigen = document.getElementById("nietBevestigen");
    var welBevestigen = document.getElementById("welBevestigen");
    var http = new XMLHttpRequest();
    modal.style.display = "block";

    // When a user clicks 'Ja' close modal and go on with the order
    welBevestigen.onclick = function () {
        modal.style.display = "none";
        orderProducts();
    }

    //Execute the actual order
    function orderProducts() {
        var count = data.length;
        if (count > 0) {
            var products = "" // Will contain all product id's of all products in cart
            for (i = 0; i < count; i++) {
                if (i == count - 1) {
                    products += data[i];
                } else {
                    products += data[i] + ",";
                }
            }

            // Open POST request and send details about the order (in 'products') to server 
            var url = 'winkelmandje.html/order';
            http.open('POST', url, true);
            http.setRequestHeader("Content-type", "application/json");
            var bestelling = {
                producten: products
            };
            http.send(JSON.stringify(bestelling));
        }
    }

    // Wait for server response about order
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = (JSON.parse(http.responseText));
            if (res.session) { // Only delete cookies of chosen products if order has been successfully inserted
                deleteProducts();
            } else { // Notify user when he is not logged in and cannot order
                alert('U bent op dit moment niet ingelogd. Log in om door te gaan met uw bestelling.');
            }
        }
    }

    // If order succeeded, remove products from cart
    function deleteProducts() {
        var cnt = document.cookie.length;
        var path = window.location.pathname;
        var cookies = getProductCookies();

        // Deleting cookies about products
        for (var i = 0; i < cookies.length; i++) {
            document.cookie = cookies[i] + "=; expires=Thu, 18 Dec 2014 12:00:00 UTC;path=/";
        }
        location.reload();
    }

    // Gets the cookie names of all cookies containing 'product'
    function getProductCookies() {
        var cookies = []; // Will contain all cookies that need to be deleted
        if (document.cookie.split("; ")[0] != "") {
            var cookieString = document.cookie.split("; ");
            var cookieCnt = document.cookie.split(";").length;
            for (i = 0; i < cookieCnt; i++) {
                var str = cookieString[i];
                if (str.search('product') != -1) {
                    var cookie01 = str.split("=");
                    var value01 = decodeURIComponent(cookie01[0]);
                    cookies.push(value01);
                }
            }
        }
        return cookies;
    }

    // When the user click 'Nee', close the modal
    nietBevestigen.onclick = function () {
        modal.style.display = "none";
    }
    // When the user clicks the close button, close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks outside the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

var data = [];
var empty = true;
// When the document is ready, add all products to the shopping cart page
$(document).ready(function getCookie() {
    if (document.cookie.split("; ")[0] != "") {
        var cookies = document.cookie.split("; ");
        var cookieCnt = document.cookie.split(";").length;
        for (i = 0; i < cookieCnt; i++) {
            var str = cookies[i];
            if (str.search('product') != -1) {
                empty = false;
                var cookie01 = str.split("=");
                var value01 = decodeURIComponent(cookie01[1]);
                data.push(value01);
            }
        }
    }
    if (empty == false) {
        displayInCart();
    } else {
        alert("Je winkelmandje is leeg");
    }
});

// Get the proper piece of HTML for the cookie and add it to the page
function displayInCart() {
    var http = new XMLHttpRequest();
    var url = "winkelmandje.html/cart";
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function () { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            var products = (JSON.parse(http.responseText));
            // Add html for every product to display them in cart
            for (var i = 0; i < products.length; i++) {
                $("#productentabel").css("display", "table");
                $("#afrekenen").css("display", "block");
                $("#productentabel").find("tbody").append("<tr>" +
                    "<td><img src='images/products/" + products[i].image + "' alt='" + products[i].productID + "'>" +
                    "<br>" + products[i].productName +
                    "<td>" + products[i].description +
                    "</td>" +
                    "<td>" +
                    "<button id = '" + products[i].productID + "' onclick=\"activateModal('" + products[i].productID + "', '" + products[i].productName + "', '" + products[i].price + "', '" + products[i].description + "', '" + products[i].image + "', '" + getCookieName(products[i].productID) + "')\"> €" + products[i].price + "-</button>" +
                    "</td>" +
                    "</tr>");
            }
        }
    }
    http.send(JSON.stringify(data));
}

// Gets the name of a cookie for a given value of productID
function getCookieName(productID) {
    var cookieString = document.cookie
    var decodeCookie = decodeURIComponent(document.cookie);
    var ca = decodeCookie.split(';');

    for (i = 0; i < ca.length; i++) {
        var cookie = ca[i];
        var j = 0;

        while (cookie.indexOf(productID) != 0 && cookie.length > 1) {
            cookie = cookie.substring(1);
            j++;
        }

        if (cookie.indexOf(productID) == 0) {
            return ca[i].substring(0, j - 1);
        }
    }
}