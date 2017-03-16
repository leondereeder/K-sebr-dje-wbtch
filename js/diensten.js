// Calculate the total price in real-time based on the parts chosen
var totaal;

function calculate() {
    totaal = 200 + //basisprijs
        parseInt(document.getElementById("cpu").value) +
        parseInt(document.getElementById("gpu").value) +
        parseInt(document.getElementById("ram").value) +
        parseInt(document.getElementById("scherm").value);
    document.getElementById("totaalbedrag").innerHTML = "Uw geselecteerde laptop kost: €" + totaal;
}

// Eventlistener for ordering a custom laptop. For now, it does get added to the shopping cart as a number and cookie, but does not show in the shopping cart itself.
document.getElementById("customBetalen").addEventListener("click", function () {
    createCookie("customLaptop", totaal);
}, false);

// Create a page-wide cookie with the product
var itemsInCart = 0;

function createCookie(id, price) {
    itemsInCart++;
    document.getElementById("shoppingCartNumber").innerHTML = itemsInCart;
    var cookieName = generateCname();
    document.cookie = cookieName + "=" + id + ";path=/";
}

// Generate a unique cookiename for the product based on the total number of cookies
function generateCname() {
    var x = decodeURIComponent(document.cookie);
    var ca = x.split("_");
    var counter = ca.length;
    var name = encodeURIComponent("product_" + counter);
    return name;
}