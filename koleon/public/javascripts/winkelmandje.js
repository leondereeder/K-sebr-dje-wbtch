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

    // When a user clicks 'delete from shopping cart' close the modal. This function is still in development
    modalbestel.onclick = function () {
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
	var url = "/winkelmandje.html";
	var params = data;
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			console.log(http.responseText);
		}
	}
	http.send(params);
}