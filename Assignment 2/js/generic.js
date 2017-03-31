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
                addToShoppingCart(value01, 1);
            }
        }
    }
});

// Add all found products to the shopping cart as a number
var itemsInCart = 0;

function addToShoppingCart(id, price) {
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

/* Test function to delete all cookies from the page
function deleteCookies() {
	var cnt = document.cookie.length;
	var path = window.location.pathname;
	for (i=0;i<cnt;i+=1) {
		document.cookie = "comment_" + i + "=; expires=Thu, 18 Dec 2014 12:00:00 UTC;path=" + path;
		document.cookie = "product_" + i + "=; expires=Thu, 18 Dec 2014 12:00:00 UTC;path=/";
	}
	location.reload();
} */