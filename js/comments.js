document.getElementById("sendComment").addEventListener("click", function (){setComment(document.getElementById("commentBox").value);});
document.getElementById("showComment").addEventListener("click", function (){getComments()});

function setComment(cvalue) {
	alert(cvalue);
	cname = generateCname();
	document.cookie = cname + "=" + cvalue + ";path=/";
	alert(document.cookie);
}

function generateCname() {
	var x = decodeURIComponent(document.cookie);
	var name;
	var ca = x.split("_");
	var counter = ca.length;
	name = encodeURIComponent("comment_" + counter);
	return name;
}
//SPATIES
function getComments() {
	var x = "";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split("; ");
	var cookieCnt = document.cookie.split(";").length;
	for(var i=0; i < cookieCnt; i++) {
		var str = ca[i];
		if(str.substring(0, 7) == "comment") {
			var c = ca[i].split("=");
			x = x + "<br><br>" + c[1];
		}
	}
	document.getElementById("commentText").innerHTML = x;
}