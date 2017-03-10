$(document).ready(function getCookie() {
	if (document.cookie.split("; ")[0] != ""){
		var cookies = document.cookie.split(";");
		var cookieCnt = document.cookie.split(";").length;
			for(i=0; i<cookieCnt; i++)
			{
				var cookie01 = cookies[i].split("=");
				var value01 = decodeURIComponent(cookie01[1]);
				addToShoppingCart(value01, 1);
			}
	}
}); 
 
	var itemsInCart = 0;
	function addToShoppingCart(id, price) {
	itemsInCart++;
	document.getElementById("shoppingCartNumber").innerHTML = itemsInCart;
}

$("body").contextmenu({
    delegate: ".container",
  menu: [
    {title: "Maak tekst kleiner", action:function(event,ui){makeSmaller();}},
    {title: "Maak tekst groter", action:function(event,ui){makeLarger();}},
    {title: "Maak tekst schuingedrukt", action:function(event,ui){makeItalic();}},
    {title: "Maak tekst dikker", action:function(event,ui){makeBold();}}
    ],
});

var smallCnt = 1;
function makeSmaller() {
	if (smallCnt == 1) {
		$("p, a, td").css("font-size","14px", 'important');
		smallCnt*=-1;
	}
	else {
		$("p, a, td").css("font-size","", 'important');
		smallCnt*-1;
	}
}
var largeCnt = 1;
function makeLarger() {
	if (largeCnt == 1) {
		$("p, a, td").css("font-size","22px", 'important');
		largeCnt*=-1;
	}
	else {
		$("p, a, td").css("font-size","", 'important');
		largeCnt*=-1;
	}
}
var boldCnt = 1;
function makeBold() {
	if (boldCnt == 1) {
		$("p, a, td").css("font-weight","bold", '!important');
		boldCnt*=-1;
	}
	else {
		$("p, a, td").css("font-weight","", '!important');
		boldCnt*=-1;
	}
}
var italicCnt = 1;
function makeItalic() {
	if (italicCnt == 1) {
		$("p, a, td").css("font-style","italic", '!important');
		italicCnt*=-1;
	}
	else {
		$("p, a, td").css("font-style","", '!important');
		italicCnt*=-1;
	}
}