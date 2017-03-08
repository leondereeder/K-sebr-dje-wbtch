document.getElementById("sendComment").addEventListener("click", function (){setComment(name, document.getElementById("commentBox").value);});

function setComment(name, value) {
	name = generateName();
	window.alert(value);
	document.cookie = name + "=" + value;
}

function generateName() {
	var x;
	return x;
}

function getComment(cname) {
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split('');
}