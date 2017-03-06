function calculate() {
	var totaal = 200 + //basisprijs
	parseInt(document.getElementById("cpu").value) +
	parseInt(document.getElementById("gpu").value) +
	parseInt(document.getElementById("ram").value) +
	parseInt(document.getElementById("scherm").value);
	document.getElementById("totaalbedrag").innerHTML = "Uw geselecteerde laptop kost: €" + totaal;
}