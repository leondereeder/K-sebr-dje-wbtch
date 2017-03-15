document.getElementById("sendComment").addEventListener("click", function (){setComment(document.getElementById("commentBox").value, document.getElementById("nickname").value);});
document.getElementById("deleteComment").addEventListener("click", function (){deleteComments()});

function setComment(cvalue, cnickname) {
	cname = generateCname();
	var cnickname;
	var path = window.location.pathname;
	document.cookie = cname + "=" + cvalue + "=" + cnickname + ";path=/";
	var x = "";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split("; ");
	var cookieCnt = document.cookie.split(";").length;
	for(var i=0; i < cookieCnt; i++) {
		var str = ca[i];
		if(str.substring(0, 7) == "comment") {
			var c = ca[i].split("=");
			if (x == 0){
				x = x + "<b>door " + c[2] + ":</b><br> " + c[1];
			}
			
			else {
			x = x + "<br><hr><br><b> door " + c[2] + ":</b><br> " + c[1];
			}
		}
	}
	if (x == ""){}
	else {
		x = x + "<hr>";
	}
	document.getElementById("commentText").innerHTML = x;
}

function generateCname() {
	var x = decodeURIComponent(document.cookie);
	var name;
	var ca = x.split("_");
	var counter = ca.length;
	name = encodeURIComponent("comment_" + counter);
	return name;
}

function deleteComments() {
	var cnt = document.cookie.length;
	for (i=0;i<cnt;i++) {
		document.cookie = "comment_" + i + "=; expires=Thu, 18 Dec 2014 12:00:00 UTC;path=/"
	}
	location.reload();
}
