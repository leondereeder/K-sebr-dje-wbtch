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
                displayInCart(value01);
            }
        }
    }
});

// Get the proper piece of HTML for the cookie and add it to the page
function displayInCart(id, price) {
    switch (id) {
    case "Alien17":
        $("#productentabel").css("display", "table");
        $("#afrekenen").css("display", "block");
        $("#productentabel").find("tbody").append(
            "<tr>" +
            "<td><img src=\"img/alienware17.png\" alt=\"Alienware 17\">" +
            "<br>Alienware 17" +
            "<td>Enorm beeldscherm. Overweldigende grafische prestaties. De Alienware 17 is de perfecte gaminglaptop voor kracht en prestaties." +
            "Voeg de optionele Graphics Amplifier toe om de ervaring nog beter te maken." +
            "</td>" +
            "<td>" +
            "<button id = \"Alien17\" onclick=\"activateModal(this.id, 1299)\"> €1299-</button>" +
            "</td>" +
            "</tr>");
        break;
    case "MSI5":
        $("#productentabel").css("display", "table");
        $("#afrekenen").css("display", "block");
        $("#productentabel").find("tbody").append(
            "<tr>" +
            "<td><img src=\"img/msi.png\" alt=\"MSI 5\">" +
            "<br>MSI Hunter 5" +
            "<td>De GL72 notebook van MSI is een krachtige notebook, ideaal voor zowel multimedia als gaming." +
            "Dankzij de laatste Intel Core i7 processor, 8 GB geheugen en een harde schijf van 1 TB is deze snelle notebook een echte alleskunner." +
            "Deze notebook is ook voorzien van de nieuwste NVIDIA GTX960M videokaart en voorzien van Windows 10." +
            "Kortom deze notebook heeft alles in huis voor de complete game-ervaring!" +
            "</td>" +
            "<td>" +
            "<button id = \"MSI5\" onclick=\"activateModal(this.id, 999)\"> €999-</button>" +
            "</td>" +
            "</tr>");
        break;
    case "PredX":
        $("#productentabel").css("display", "table");
        $("#afrekenen").css("display", "block");
        $("#productentabel").find("tbody").append(
            "<tr>" +
            "<td><img src=\"img/PredatorX.png\" alt=\"PredatorX\">" +
            "<br>Predator X" +
            "<td>De Predator X brengt je game-ervaring tot ongekende hoogtes dankzij de nieuwste Intel-i7 processor en gtx 1080 videokaart." +
            "Samen met een full HD scherm en 16 gigabyte RAM geheugen kan niks je stoppen." +
            "</td>" +
            "<td>" +
            "<button id = \"PredX\" onclick=\"activateModal(this.id, 1499)\"> €1499-</button>" +
            "</td>" +
            "</tr>");
        break;
    }
}