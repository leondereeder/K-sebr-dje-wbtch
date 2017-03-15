var totaal;
function calculate() {
	totaal = 200 + //basisprijs
	parseInt(document.getElementById("cpu").value) +
	parseInt(document.getElementById("gpu").value) +
	parseInt(document.getElementById("ram").value) +
	parseInt(document.getElementById("scherm").value);
	document.getElementById("totaalbedrag").innerHTML = "Uw geselecteerde laptop kost: €" + totaal;
}

document.getElementById("customBetalen").addEventListener("click", function(){createCookie("customLaptop", totaal);}, false);

var itemsInCart = 0;
function createCookie(id, price) {
	itemsInCart++;
	document.getElementById("shoppingCartNumber").innerHTML = itemsInCart;
	var cookieName = generateCname();
	document.cookie = cookieName + "=" + id + ";path=/";
	}
		
function generateCname() {
	var x = decodeURIComponent(document.cookie);
	var ca = x.split("_");
	var counter = ca.length;
	var name = encodeURIComponent("product_" + counter);
    return name;
}