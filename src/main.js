const inputContainer = document.getElementById("inputContainer");
const inputField = document.getElementsByClassName("inputField");
const nameInput = document.getElementById("name");
const genderInput = document.getElementById("gender");
const generateBtn = document.getElementById("generateBtn");
const luckedPairs = `belle taliya
david william
jerry louie
yuzhi rishi`.toLowerCase().split("\n").map((value) => value.split(" "));
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

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function setSeat(xAxis, yAxis, value) {
	res[yAxis][xAxis] = value;
	names.remove(value);
	male.remove(value);
	female.remove(value);
}

function readData() {
	// read data
	luckPairs = luckedPairs.slice()	;
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
Winston`.toLowerCase().split("\n");
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
m`.toLowerCase().split("\n");
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
	x = 23;
	y = 1;
	var tempArr = [];
	for (let i = 0; i < x; i++) {
		tempArr.push("");
	}
	for (let i = 0; i < y; i++) {
		res.push(tempArr);
	}
}

function generate() {
	var currentName = "";
	var nextName = "";
	var tempPair = [];
	for (let i = 0; i < x; i++) {
		// every row
		for (let j = 0; j < y; j++) {
			// every seat

			if (nextName != "") {
				currentName = nextName.slice();
				nextName = "";
				setSeat(i, j, currentName);
				continue;
			}
			currentName = names[Math.floor(Math.random()*names.length)];

			luckPairs.forEach((pair) => {
				if (pair.includes(currentName)) {
					nextName = (pair[0] == currentName ? pair[1] : pair[0]);
					tempPair = pair;
				}
			});
			if (tempPair != []) {
				luckPairs.remove(tempPair);
				tempPair = [];
			}
			setSeat(i, j, currentName);
		}
	}
	console.log(res);
}

generateBtn.onclick = () => {
	readData();
	generate();
}
