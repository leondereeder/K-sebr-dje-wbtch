$(document).ready(function() {
	getInfo();
});

function getInfo(){
	
	var http = new XMLHttpRequest();
	var url = "mijnprofiel.html";
	var userID = [];
	userID.push(document.getElementById("userName").innerHTML);
	alert(userID);
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/json");

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			var data = (JSON.parse(http.responseText));
			fillPage(data);
		}
	}
	
	http.send(JSON.stringify(userID));
}

function fillPage(data) {
	console.log(data);
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
}