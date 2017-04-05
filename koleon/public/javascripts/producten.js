// When a price has been clicked on, activate its modal
function activateModal(id, productName, price, description, image) {
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

// Create a page-wide cookie with the product
var itemsInCart = 0;

function createCookie(id, price) {
    itemsInCart++;
    document.getElementById("shoppingCartNumber").innerHTML = itemsInCart;
    var cookieName = generateProductName();
    document.cookie = cookieName + "=" + id + ";path=/";
}

// Generate a unique cookiename for the product based on the total number of products
function generateProductName() {
    var x = decodeURIComponent(document.cookie);
    var ca = x.split("_");
    var counter = ca.length;
    var name = encodeURIComponent("product_" + counter);
    return name;
}

$(document).ready(function (){
	var data = [];
	
	var http = new XMLHttpRequest();
	var url = "producten.html";
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/json");

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			var products = (JSON.parse(http.responseText));
			for(i=0;i<products.length;i++) {
				$(".producten").css("display", "table");
				$(".producten").find("tbody").append("<td(id=" + products[i].productID + " onclick='activateModal('" + products[i].productID + "', '" + products[i].productName + "', " + products[i].price + ", '" + products[i].description + "', '" + product[i].image + "')>+<img src='images/products/" + products[i].image  + "' alt='" + products[i].productName + "'<br>" + products[i].productName + "<br>€" + products[i].price + "-");
			}
		}
	}
	http.send(JSON.stringify(data));
});

$(document).ready(function(){
	var count = $(".producten").find($("td")).length;
	for(i=0;i<count;i+=3) {
		$("tbody").find("tr:last-child").after("<tr id='productsContainer"+i+"'></tr>");
		$("#product"+i+", #product"+(i+1)+", #product"+(i+2)).appendTo("#productsContainer"+i);
	}
});