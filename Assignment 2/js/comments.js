// Eventlistener for adding a comment
document.getElementById("sendComment").addEventListener("click", function () {
    setComment(document.getElementById("commentBox").value, document.getElementById("nickname").value);
});
// Eventlistener for the 'clear comments' button
// document.getElementById("deleteComment").addEventListener("click", function (){deleteComments()});

// Create a cookie for a specific page and update all comments
function setComment(cvalue, cnickname) {
    cname = generateCname();
    var cnickname;
    var path = window.location.pathname;
    document.cookie = cname + "=" + cvalue + "=" + cnickname + ";path=" + path;
    getComment();
}

// When the document is ready, show all comments
$(document).ready(function () {
    getComment();
});

// Read and display all comments
function getComment() {
    var x = "";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split("; ");
    var cookieCnt = document.cookie.split(";").length;
    for (var i = 0; i < cookieCnt; i++) {
        var str = ca[i];
        if (str.substring(0, 7) == "comment") {
            var c = ca[i].split("=");
            if (x == 0) {
                x = x + "<b>door " + c[2] + ":</b><br> " + c[1];
            } else {
                x = x + "<br><hr><br><b> door " + c[2] + ":</b><br> " + c[1];
            }
        }
    }
    // If comment is empty, do not display anything
    if (x == "") {} else {
        x = x + "<hr>";
    }
    document.getElementById("commentText").innerHTML = x;

}

// Generate unique cookiename based on the total number of comments
function generateCname() {
    var x = decodeURIComponent(document.cookie);
    var name;
    var ca = x.split("_");
    var counter = ca.length;
    name = encodeURIComponent("comment_" + counter);
    return name;
}

/* Test function to delete all comments from the page
function deleteComments() {
	var cnt = document.cookie.length;
	var path = window.location.pathname;
	for (i=0;i<cnt;i++) {
		document.cookie = "comment_" + i + "=; expires=Thu, 18 Dec 2014 12:00:00 UTC;path=" + path;
	}
	location.reload();
} */