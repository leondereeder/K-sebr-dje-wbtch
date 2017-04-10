/*
	This js file is used on the mijnprofiel.jade page in order to request, handle and output all the relevant information
*/
// Retrieve info when page is ready
$(document).ready(function () {
    getInfo();
});

// Send userid to server and request information about that user
function getInfo() {

    var http = new XMLHttpRequest();
    var url = "mijnprofiel.html";
    var userID = [];
    userID.push(document.getElementById("userName").innerHTML);

    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function () { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            var data = (JSON.parse(http.responseText));
            fillPage(data);
        }
    }

    http.send(JSON.stringify(userID));
}

// Fills the user page with the received data
function fillPage(data) {
    // Setting user data in html
    document.getElementById("userName").innerHTML = data[0].userName;
    document.getElementById("firstName").innerHTML = data[0].firstName;
    document.getElementById("lastName").innerHTML = data[0].lastName;
    document.getElementById("address").innerHTML = data[0].address + " " + data[0].postalCode;
    var account = document.getElementById("account");
    switch (data[0].userType) {
    case "RS":
        account.innerHTML = "Registered seller";
        break;
    case "RB":
        account.innerHTML = "Registered buyer"
    }
    //Fill Bought Products table for user
    for (i = 1; i < data.length; i++) {
        if (data[i].userID == data[0].userID) {
            $("#productentabel").css("display", "table");
            $("#productentabel").find("tbody").append("<tr>" +
                "<td><img src='images/products/" + data[i].image + "' alt='" + data[i].productID + "'>" +
                "<br>" + data[i].productName +
                "<td>" + data[i].description +
                "</td>" +
                "<td>" +
                "€" + data[i].price + "-</button>" +
                "<br><p>Gekocht op: " + data[i].date + "</p>" +
                "</td>" +
                "</tr>");
        }
    }
    // If user is Registered Seller, fill Sold Products and Available Products tables
    if (data[0].userType == "RS") {
        $(".rsSection").css("display", "block");
        for (i = 1; i < data.length; i++) {
            // If data[i] contains id element, this means the product is part of Available Products
            if (data[i].id != undefined) {
                $(".availableTabel").css("display", "table");
                $(".availableTabel").find("tbody").append("<tr>" +
                    "<td><img src='images/products/" + data[i].image + "' alt='" + data[i].productID + "'>" +
                    "<br>" + data[i].productName +
                    "<td>" + data[i].description +
                    "</td>" +
                    "<td>" +
                    "€" + data[i].price + "-</button>" +
                    "</td>" +
                    "<td class=\"tinyCell\">" + data[i].stock +
                    "</td>" +
                    "</tr>");
            }
            // Else, product is part of the Sold Products
            else if (data[i].sellerID == data[0].userID) {
                $(".sellersTabel").css("display", "table");
                $(".sellersTabel").find("tbody").append("<tr>" +
                    "<td><img src='images/products/" + data[i].image + "' alt='" + data[i].productID + "'>" +
                    "<br>" + data[i].productName +
                    "<td>" + data[i].description +
                    "</td>" +
                    "<td>" +
                    "€" + data[i].price + "-</button>" +
                    "<br><p>Verkocht op: " + data[i].date + "</p>" +
                    "</td>" +
                    "<td class=\"tinyCell\">" + data[i].stock +
                    "</td>" +
                    "</tr>");
            }
        }

    }
}

document.getElementById("editProfile").addEventListener("click", function () {
    editProfile();
});

//Function to change HTML of user detail to input fields
function editProfile() {
    $("#userName").replaceWith("<td><input type='text' name='userName'value='" + $("#userName").html() + "'></input></td>");
    $("#firstName").replaceWith("<td><input type='text' name='firstName' value='" + $("#firstName").html() + "'></input></td>");
    $("#lastName").replaceWith("<td><input type='text' name='lastName' value='" + $("#lastName").html() + "'></input></td>");
    $("#address").replaceWith("<td><input type='text' name='address' value='" + $("#address").html() + "'></input></td>");
    $("#account").replaceWith("<td><select style='padding:0px'><option value='RS'>Registered seller</option><option value='RB'>Registered buyer</option></select></td>");
    $("#editProfile").replaceWith('<button id="saveProfile">Opslaan</button>');
    document.getElementById("saveProfile").addEventListener("click", function () {
        saveProfile();
    });
}

// Function to request server to process the edited user data and refresh page when done
function saveProfile() {
    var http = new XMLHttpRequest();
    var url = "mijnprofiel.html/edit";
    var data = [];
    $(".accountTable :input").each(function () {
        data.push($(this).val());
    });
    console.log(data);
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function () { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            window.location.href = window.location.href;
        }
    }

    http.send(JSON.stringify(data));
}