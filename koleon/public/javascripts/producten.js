// When a price has been clicked on, activate its modal
function activateModal(id, price) {
    var modal = document.getElementById('myModal');
    var modalheader = document.getElementById('modalheadertext');
    var modalbody = document.getElementById('modaltext');
    var modalimg = document.getElementById('modalimg');
    var btn = document.getElementById(id);
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    var modalbestel = document.getElementById("modalbestel");
    switch (id) {
    case "Alien17":
        modalheader.innerHTML = "Alienware 17";
        modalbody.innerHTML = "Enorm beeldscherm. Overweldigende grafische prestaties. De Alienware 17 is de perfecte gaminglaptop voor kracht en prestaties. Voeg de optionele Graphics Amplifier toe om de ervaring nog beter te maken.<br><br>Prijs: €1299-";
        modalimg.src = "img/alienware17.png";
        break;
    case "MSI5":
        modalheader.innerHTML = "MSI Hunter 5";
        modalbody.innerHTML = "De GL72 notebook van MSI is een krachtige notebook, ideaal voor zowel multimedia als gaming. Dankzij de laatste Intel Core i7 processor, 8 GB geheugen en een harde schijf van 1 TB is deze snelle notebook een echte alleskunner. Deze notebook is ook voorzien van de nieuwste NVIDIA GTX960M videokaart en voorzien van Windows 10. Kortom deze notebook heeft alles in huis voor de complete game-ervaring!<br><br>Prijs: €999-";
        modalimg.src = "img/msi.png";
        break;
    case "PredX":
        modalheader.innerHTML = "Predator X";
        modalbody.innerHTML = "De Predator X brengt je game-ervaring tot ongekende hoogtes dankzij de nieuwste Intel-i7 processor en gtx 1080 videokaart. Samen met een full HD scherm en 16 gigabyte RAM geheugen kan niks je stoppen.<br><br>Prijs: €1499-";
        modalimg.src = "img/PredatorX.png";
        break;
    }

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