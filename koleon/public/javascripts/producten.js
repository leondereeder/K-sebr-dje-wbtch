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

function getSorting() {
	
	var e = document.getElementById('orderby');
	var orderby = e.options[e.selectedIndex].value;
	console.log(orderby);
	return orderby;
}

var checkboxes = ['13-inch', '15-inch', '17-inch', 'Dell', 'HP', 'Asus', 'Acer', 'MSI', 'Logitech', 'Trust', 'Gaming-Laptops', 'Gaming-Desktops', 'Randapperatuur', 'Headset', 'Nvidea', 'AMD', 'DDR3-RAM', 'DDR4-RAM', 'Gaming-Muis', 'Optisch', 'Laser', 'Toetsenbord', 'Draadloos', 'Bedraad'];

function getFilter() {
	var filter = [];
	
	
	//loop to check which checkboxes are checked and add values to array accordingly
	for(var i=0; i < checkboxes.length; i++)
	{
		if (document.getElementById(checkboxes[i]).checked)
		{
			var x = document.getElementById(checkboxes[i]).value;
			filter.push(x);
		}
		
		else if (document.getElementById(checkboxes[i]).checked == false)
		{
			filter.push('0');
		}
	}
	console.log(filter);
	return filter;
}

$(document).ready(function(){
	//eventlisteners
	//voor checkboxes
	for(var i=0; i<checkboxes.length; i++)	
	{
		document.getElementById(checkboxes[i]).addEventListener("change", function(){getFilter()});
		
	}
	//sorteerbox
	document.getElementById('orderby').addEventListener("change", function(){getSorting()});
	
	getProducts(1);
});

function getProducts(pageNr){
	var data = [];
	data.push(pageNr);
	
	var sort = getSorting();
	var filter = getFilter();
	console.log(sort);
	//console.log(filter);
	
	var http = new XMLHttpRequest();
	var url = "producten.html";
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/json");

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			var products = (JSON.parse(http.responseText));
			for(i=0;i<products.length-1;i++) {
				$(".producten").css("display", "table");
				$(".producten").find("tr").append(
				"<td id='product" + i + "'" +
				" onclick=\"activateModal('" + products[i].productID + "', '" + products[i].productName + "', '" + products[i].price +  "', '" + products[i].description  +  "', '" + products[i].image + "')\">" + 
				"<img src='images/products/" + products[i].image  + "' alt='" + products[i].productName + "'><br>" + products[i].productName + "<br>€" + products[i].price + "-" );
			}
			makePages(products[products.length-1]);
		}
	}
	http.send(JSON.stringify(data));
}

currentPage = 1;

function makePages(totalProducts) {
	var totalPages = Math.ceil(totalProducts/12);
	$(".pagination").append("<a href='javascript:changePage(\"previous\");'>&laquo;</a>");
	for(i=1;i!=totalPages+1;i++) {
		if(i==currentPage) {
			$(".pagination").append("<a href='javascript:changePage(" + i + ");' class='active'>" + i + "</a>");
		}
		else {
			$(".pagination").append("<a href='javascript:changePage(" + i + ");'>" + i + "</a>");
		}
	}
	$(".pagination").append("<a href='javascript:changePage(\"next\");'>&raquo;</a>");
	makeRows();
}

function changePage(page) {
	switch(page) {
		case 'next':
			resetPage();
			getProducts(currentPage + 1);
			currentPage++;
			break;
		case 'previous':
			if(currentPage > 1) {
				resetPage();
				getProducts(currentPage - 1);
				currentPage-=1;
			}
			break;
		default:
			resetPage();
			getProducts(page);
			currentPage=page;
			break;
	}
	function resetPage() {
		$(".pagination").empty();
		$("tbody").empty().append("<tr></tr>");
	}
}

function makeRows() {
	var count = $(".producten").find($("td")).length;
	for(i=0;i<count;i+=3) {
		$("tbody").find("tr:last-child").after("<tr id='productsContainer"+i+"'></tr>");
		$("#product"+i+", #product"+(i+1)+", #product"+(i+2)).appendTo("#productsContainer"+i);
	}
}