/*
	Producten.JS contains all scripts used on the producen.jade page
*/
// When a price has been clicked on, activate its modal
function activateModal(id, productName, price, description, image, stock) {
    var modal = document.getElementById('myModal');
    var modalheader = document.getElementById('modalheadertext');
    var modalbody = document.getElementById('modaltext');
    var modalimg = document.getElementById('modalimg');
    var btn = document.getElementById(id);
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    var modalbestel = document.getElementById("modalbestel");
    modalheader.innerHTML = productName;
    modalbody.innerHTML = description + "<br><br>Prijs: €" + price + "-" +
        "<br><br>Voorraad: " + stock;
    modalimg.src = "images/products/" + image;

    // When the use clicks order, create a cookie with the product
    modalbestel.onclick = function () {
        createCookie(id, price);
        modal.style.display = "none";
    }

    // When the close button has been clicked, close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks outside the modal, close the modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


var itemsInCart = 0;
var searchFor = "";

// Create a page-wide cookie with the product
function createCookie(id, price) {
    itemsInCart++;
    document.getElementById("shoppingCartNumber").innerHTML = itemsInCart;
    var cookieName = generateProductName();
    document.cookie = cookieName + "=" + id + ";path=/";
}

// Generate a unique cookiename for the product based on the total number of products
function generateProductName() {
    var x = "product_";
    var number = Math.floor(Math.random() * 10000);

    if (freeNumber(number)) {
        return x += number;
    } else {
        generateProductName();
    }
}

// Check if the number is free
function freeNumber(number) {
    var cname = "product_" + number;
    if (getCookieByName(cname) == "") {
        return true;
    } else {
        return false;
    }
}


function getCookieByName(cname) { // Example from W3Schools: https://www.w3schools.com/js/js_cookies.asp
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var c = cookieArray[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Get value of sorting box
function getSorting() {

    var e = document.getElementById('orderby');
    var orderby = e.options[e.selectedIndex].value;
    return orderby;
}

// All checkboxes
var checkboxes = ['Gaming-Laptops', 'Gaming-Desktops', 'Randapperatuur', 'Dell', 'HP', 'Asus', 'Acer', 'MSI', 'Logitech', 'Trust', 'Razer', '13-inch', '15-inch', '17-inch', 'Nvidea', 'AMD', 'DDR3-RAM', 'DDR4-RAM', 'Headset', 'Gaming-Muis', 'Optisch', 'Laser', 'Toetsenbord', 'Draadloos', 'Bedraad'];

// Show all filters
function showFilter() {

    if (document.getElementById('Gaming-Laptops').checked || document.getElementById('Gaming-Desktops').checked) {
        document.getElementById('schermgrootte').style.display = 'block';
        document.getElementById('computereigenschappen').style.display = 'block';
    } else {
        document.getElementById('computereigenschappen').style.display = 'none';
        document.getElementById('schermgrootte').style.display = 'none';

        //turn of checkboxes in hidden filters
        for (var i = 0; i < checkboxes.length; i++) {
            if (i >= 11 && i <= 17)
                document.getElementById(checkboxes[i]).checked = false;
        }
    }


    if (document.getElementById('Randapperatuur').checked) {
        document.getElementById('randapperatuureigenschappen').style.display = 'block';
    } else {
        document.getElementById('randapperatuureigenschappen').style.display = 'none';

        for (var i = 0; i < checkboxes.length; i++) {
            if (i >= 18)
                document.getElementById(checkboxes[i]).checked = false;

        }

    }
}

// Get the values of all the filters
function getFilter() {
    var filter = [];


    //loop to check which checkboxes are checked and add values to array accordingly
    for (var i = 0; i < checkboxes.length; i++) {
        if (document.getElementById(checkboxes[i]).checked) {
            var x = document.getElementById(checkboxes[i]).value;
            filter.push(x);
        } else if (document.getElementById(checkboxes[i]).checked == false) {
            filter.push('0');
        }
    }
    return filter;
}

// When a filter is activated, clear the existing filter data, reset the products, and get new ones
function generateFilteringQuery() {
    delete data[1];
    delete data[2];
    resetPage();
    getProducts();
}

//this variable is used to send data to the server, it will be converted to JSON in getProducts()
var data = [];

//onload of the document we add eventlisteners to all filtering elements
$(document).ready(function () {
    //eventlisteners
    //voor checkboxes
    for (var i = 0; i < checkboxes.length; i++) {
        document.getElementById(checkboxes[i]).addEventListener("change", function () {
            showFilter();
        });
        document.getElementById(checkboxes[i]).addEventListener("change", function () {
            generateFilteringQuery();
        });

    }
    //sorteerbox
    document.getElementById('orderby').addEventListener("change", function () {
        generateFilteringQuery();
    });
    $("#searchProducts").keyup(function () {
        searchProducts();
    });

    showFilter();
    generateFilteringQuery();
});

//this function always use to search products using a searchbar
function searchProducts() {
    searchFor = document.getElementById("searchProducts").value;
    resetPage();
    data[3] = searchFor;
    getProducts();
}

/*
getproducts will request the products from the server. It does this by sending an array called data which contains
information about selected filtering. The functions getSorting() and getFilter() do this.
After the array has its data the object is converted to JSON and send to the server
*/
function getProducts() {
    data[0] = currentPage;
    data[1] = getSorting();
    data[2] = getFilter();
	data[3] = searchFor;
	
    var http = new XMLHttpRequest();
    var url = "producten.html";
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function () { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            var products = (JSON.parse(http.responseText));
            for (i = 0; i < products.length - 1; i++) {
                $(".producten").css("display", "table");
                $(".producten").find("tr").append(
                    "<td id='product" + i + "'" +
                    " onclick=\"activateModal('" + products[i].productID + "', '" + products[i].productName + "', '" + products[i].price + "', '" + products[i].description + "', '" + products[i].image + "', '" + products[i].stock + "')\">" +
                    "<img src='images/products/" + products[i].image + "' alt='" + products[i].productName + "'><br>" + products[i].productName + "<br>€" + products[i].price + "-");
            }
            makePages(products[products.length - 1]);
        }
    }

    http.send(JSON.stringify(data));
}

currentPage = 1;
var totalPages;

//this function enables pagination. 
function makePages(totalProducts) {
    totalPages = Math.ceil(totalProducts / 12);
    $(".pagination").append("<a href='javascript:changePage(\"previous\");'>&laquo;</a>");
    for (i = 1; i != totalPages + 1; i++) {
        if (i == currentPage) {
            $(".pagination").append("<a href='javascript:changePage(" + i + ");' class='active'>" + i + "</a>");
        } else {
            $(".pagination").append("<a href='javascript:changePage(" + i + ");'>" + i + "</a>");
        }
    }
    $(".pagination").append("<a href='javascript:changePage(\"next\");'>&raquo;</a>");
    makeRows();
}

//this function handles switching between pages of products
function changePage(page) {
    switch (page) {
    case 'next':
        if (currentPage + 1 <= totalPages) {
            resetPage();
            currentPage++;
            getProducts();
        }
        break;
    case 'previous':
        if (currentPage > 1) {
            resetPage();
            currentPage -= 1;
            getProducts();
        }
        break;
    default:
        resetPage();
        currentPage = page;
        getProducts();
        break;
    }
}

// Reset data about the page and product to avoid overlapse from new AJAX request
function resetPage() {
    $(".pagination").empty();
    $("tbody").empty().append("<tr></tr>");
    delete data[0];
    delete data[3];
}

// Order all the products into rows of 3 products
function makeRows() {
    var count = $(".producten").find($("td")).length;
    for (i = 0; i < count; i += 3) {
        $("tbody").find("tr:last-child").after("<tr id='productsContainer" + i + "'></tr>");
        $("#product" + i + ", #product" + (i + 1) + ", #product" + (i + 2)).appendTo("#productsContainer" + i);
    }
}