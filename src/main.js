const inputContainer = document.getElementById("inputContainer");
const inputField = document.getElementsByClassName("inputField");
const nameInput = document.getElementById("name");
const genderInput = document.getElementById("gender");
const generateBtn = document.getElementById("generateBtn");
const luckedPairs = `belle taliya
david william
jerry louie
yuzhi rishi`
	.toLowerCase()
	.split("\n")
	.map((value) => value.split(" "));
var names = [];
var genders = [];
var male = [];
var female = [];
var res = [];
var x = 0;
var y = 0;
var luckPairs = [];

// set border
inputField[inputField.length - 1].style.border = "none";

Array.prototype.remove = function () {
	var what,
		a = arguments,
		L = a.length,
		ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};

function setSeat(xAxis, yAxis, value = "") {
	names.remove(value);
	male.remove(value);
	female.remove(value);
	return value;
}

function readData() {
	// read data
	luckPairs = luckedPairs.slice();
	names = nameInput.value.toLowerCase().split("\n");
	genders = genderInput.value.toLowerCase().split("\n");

	names = `Samuel
Rishi
Ian
Jade
William
Taliya
Keira
Clementine
Tiffany
Hendre
Jerry
Hin Ching
Hin Lung
Yuzhi
Valerie
Hailey
David
Lucy
Adianna
Dani
Louie
Belle
Winston`
		.toLowerCase()
		.split("\n");
	genders = `m
m
m
f
m
f
f
f
f
m
m
f
m
m
f
f
m
f
f
m
m
f
m`
		.toLowerCase()
		.split("\n");
	male = [];
	female = [];
	res = [];

	names.forEach((name, i) => {
		if (genders[i] == "m") {
			male.push(name);
		} else if (genders[i] == "f") {
			female.push(name);
		}
	});

	x = document.getElementById("x").value;
	y = document.getElementById("y").value;
}

function getNextName(lastName) {
	var nextNames = [];
	nextNames = names.slice();
	luckPairs.forEach((pair) => {
		if (pair.includes(lastName)) {
			nextNames = [
				pair[0] == lastName
					? pair[1]
					: pair[0]
			];
			luckPairs.remove(pair);
		}
	});
	
	return nextNames;
}

function generate() {
	var currentName = "";
	var avaiableNames = names.slice();
	for (let i = 0; i < x; i++) {
		// every row
		var row = [];
		for (let j = 0; j < y; j++) {
			// every seat
			currentName = avaiableNames[Math.floor(Math.random() * avaiableNames.length)];
			avaiableNames = [];
			setSeat(i, j, currentName);
			row.push(currentName);

			// luck system
			avaiableNames = getNextName(currentName);
		}
		res.push(row);
	}
	console.log(res);
}

generateBtn.onclick = () => {
	readData();
	generate();
};
