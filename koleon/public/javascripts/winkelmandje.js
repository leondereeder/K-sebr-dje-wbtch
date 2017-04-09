// When a price has been clicked on, activate its modal
function activateModal(id, productName, price, description, image, cookieNmbr) {
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
	
	function deleteProduct() {
		document.cookie = "product_" + cookieNmbr + "=; expires=Thu, 18 Dec 2014 12:00:00 UTC;path=/";
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

document.getElementById("afrekenen").addEventListener("click", function() {bevestigAankoop();});

function bevestigAankoop() {
	var modal = document.getElementById('afrekenBevestiging');
    var modalbody = document.getElementById('modaltext');
    var span = document.getElementsByClassName("close")[0];
	var nietBevestigen = document.getElementById("nietBevestigen");
	var welBevestigen = document.getElementById("welBevestigen");
	var http = new XMLHttpRequest();
    modal.style.display = "block";
	
    // When a user clicks 'Ja' delete everything from shopping cart because the item has been purchased
    welBevestigen.onclick = function () {
        modal.style.display = "none";
		orderProducts();
    }
	
	function orderProducts() {
		var count = data.length;
		if (count > 0) {
			var products = ""
			for (i=0;i<count;i++) {
				if (i == count - 1) {
					products += data[i];
				}
				else {
					products += data[i] + ",";
				}
			}
			document.cookie = "bestelling=" + products + ";path=/";
			
			var url = 'winkelmandje.html/order';
			http.open('POST', url, true);
			http.setRequestHeader("Content-type", "application/json");
			var bestelling = {producten: products};
			http.send(JSON.stringify(bestelling));
		}
	}
	
	http.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var res = (JSON.parse(http.responseText));
			if(res.session) {
				alert('test');
				deleteProducts();
			}
			else {
				alert('not logged in');
			}
		}
	}
	
	function deleteProducts() {
		var cnt = document.cookie.length;
		var path = window.location.pathname;
		for (i=0;i<cnt;i+=1) {
			document.cookie = "product_" + i + "=; expires=Thu, 18 Dec 2014 12:00:00 UTC;path=/";
		}
	location.reload();
	}

	// When the user click 'Nee', close the modal
	nietBevestigen.onclick = function() {
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
// When the document is ready, add all products to the shopping cart page
$(document).ready(function getCookie() {
    if (document.cookie.split("; ")[0] != "") {
        var cookies = document.cookie.split("; ");
        var cookieCnt = document.cookie.split(";").length;
        for (i = 0; i < cookieCnt; i++) {
            var str = cookies[i];
            if (str.substring(0, 7) == "product") {
                var cookie01 = cookies[i].split("=");
                var value01 = decodeURIComponent(cookie01[1]);
                data.push(value01);
            }
        }
    }
	displayInCart();
});

// Get the proper piece of HTML for the cookie and add it to the page
function displayInCart() {
	var http = new XMLHttpRequest();
	var url = "winkelmandje.html/cart";
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/json");

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			var products = (JSON.parse(http.responseText));
			for(i=0;i<products.length;i++) {
				$("#productentabel").css("display", "table");
				$("#afrekenen").css("display", "block");
				$("#productentabel").find("tbody").append("<tr>" +
				"<td><img src='images/products/" + products[i].image + "' alt='" + products [i].productID + "'>" +
				"<br>" + products[i].productName + 
				"<td>" + products[i].description + 
				"</td>" +
				"<td>" +
				"<button id = '" + products[i].productID + "' onclick=\"activateModal('" + products[i].productID + "', '" + products[i].productName + "', '" + products[i].price +  "', '" + products[i].description  +  "', '" + products[i].image + "', " + i + ")\"> €" + products[i].price + "-</button>" +
				"</td>" +
				"</tr>");
			}
		}
	}
	http.send(JSON.stringify(data));
}