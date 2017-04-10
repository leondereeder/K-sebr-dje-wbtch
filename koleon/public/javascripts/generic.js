/*
	GENERIC.JS contains Javascripts required on all pages, like adding products to the shopping cart and the contextmenu
	made for assignment 2
*/
// When the document is ready, load all the products into the shopping cart
$(document).ready(function getCookie() {
    if (document.cookie.split("; ")[0] != "") {
        var cookies = document.cookie.split("; ");
        cookieCnt = document.cookie.split(";").length;
        for (i = 0; i < cookieCnt; i += 1) {
            str = cookies[i];
            if (str.substring(0, 7) == "product") {
                cookie01 = cookies[i].split("=");
                value01 = decodeURIComponent(cookie01[1]);
                addToShoppingCart(value01);
            }
        }
    }
});

// Get the page session
$(document).ready(function getSession() {
    var cookies = document.cookie.split("; ")
    cookieCnt = document.cookie.split(";").length;
    for (i = 0; i < cookieCnt; i += 1) {
        str = cookies[i];
        if (str.substring(0, 2) == "id") {
            cookie01 = cookies[i].split("=");
            value01 = decodeURIComponent(cookie01[1]);
            document.getElementsByClassName("startLogin")[0].innerHTML = "Mijn account";
        }
    }
});

// Add all found products to the shopping cart as a number
var itemsInCart = 0;

function addToShoppingCart(id) {
    itemsInCart += 1;
    document.getElementById("shoppingCartNumber").innerHTML = itemsInCart;
}

// JQuery UI context accessibility menu
$("body").contextmenu({
    delegate: ".container",
    menu: [{
            title: "Maak tekst kleiner",
            action: function (event, ui) {
                makeSmaller();
            }
        },
        {
            title: "Maak tekst groter",
            action: function (event, ui) {
                makeLarger();
            }
        },
        {
            title: "Maak tekst schuingedrukt",
            action: function (event, ui) {
                makeItalic();
            }
        },
        {
            title: "Maak tekst dikker",
            action: function (event, ui) {
                makeBold();
            }
        }
        // Test function to delete all cookies from the page
        // {title: "Verwijder cookies", action:function(event,ui){deleteCookies();}}
    ]
});

// Make all text smaller. Shares a counter with makeLarger()
var textCnt = 1;

function makeSmaller() {
    if (textCnt == 1) {
        $("p, a, td").css("font-size", "14px", 'important');
        textCnt *= -1;
    } else {
        $("p, a, td").css("font-size", "", 'important');
        textCnt * -1;
    }
}

// Make all text larger. Shares a counter with makeSmaller()
function makeLarger() {
    if (textCnt == 1) {
        $("p, a, td").css("font-size", "22px", 'important');
        textCnt *= -1;
    } else {
        $("p, a, td").css("font-size", "", 'important');
        textCnt *= -1;
    }
}

// Make all text bold
var boldCnt = 1;

function makeBold() {
    if (boldCnt == 1) {
        $("p, a, td").css("font-weight", "bold", '!important');
        boldCnt *= -1;
    } else {
        $("p, a, td").css("font-weight", "", '!important');
        boldCnt *= -1;
    }
}

// Make all text italic
var italicCnt = 1;

function makeItalic() {
    if (italicCnt == 1) {
        $("p, a, td").css("font-style", "italic", '!important');
        italicCnt *= -1;
    } else {
        $("p, a, td").css("font-style", "", '!important');
        italicCnt *= -1;
    }
}

// Get the modal
var loginModal = document.getElementById('loginModal');
var registerModal = document.getElementById('registerModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
    if (event.target == registerModal) {
        registerModal.style.display = "none";
    }
}

var logoutButton = document.getElementsByClassName("logout")[0];
if (typeof logoutButton !== "undefined") {
    logoutButton.addEventListener("click", function () {
        logout();
    });
}

// AJAX request for logout
function logout() {
    var data = {
        'logout': true
    }
    var http = new XMLHttpRequest();
    var url = window.location.href;
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

var password = document.getElementById("password"),
    confirm_password = document.getElementById("confirm_password");

// Check to validate if entered passwords in registration are the same 
function validatePassword() {
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity('');
    }
}

if (password != null && confirm_password != null) {
    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;
}