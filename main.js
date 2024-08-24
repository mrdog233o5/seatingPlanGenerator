const inputContainer = document.getElementById("inputContainer");
const inputField = document.querySelectorAll("textarea");
const nameInput = document.getElementById("name");
const genderInput = document.getElementById("gender");
const result = document.getElementById("result");
const generateBtn = document.getElementById("generateBtn");
const textareaEle = document.querySelectorAll('textarea');
const luckedPairs = `belle taliya
david william
jerry louie
yuzhi rishi
hendre samuel`
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
}

function getNextName(lastName, index) {	
	var nextNames = [];
	var isLucky = false;
	nextNames = names.slice();
	luckPairs.forEach((pair) => {
		if (pair.includes(lastName) && !isLucky) {
			nextNames = [
				pair[0] == lastName
					? pair[1]
					: pair[0]
			];
			luckPairs.remove(pair);
			isLucky = true;
		}
	});
	
	if (x - index % x != 2 || isLucky) return nextNames;

	nextNames = names.slice();
	luckPairs.forEach((pair) => {
		nextNames.remove(pair[0]);
		nextNames.remove(pair[1]);
	});
	if (nextNames.length == 0) return names;
	return nextNames;
}

function generate() {
	document.getElementsByClassName("result")[0].style.display = "flex";
	result.innerHTML = "";
	var currentName = "";
	var avaiableNames = names.slice();
	for (let i = 0; i < y; i++) {
		// every row
		for (let j = 0; j < x; j++) {
			// every seat
			currentName = avaiableNames[Math.floor(Math.random() * avaiableNames.length)];
			avaiableNames = [];
			setSeat(i, j, currentName);
			res.push(currentName);

			// luck system
			avaiableNames = getNextName(currentName, i*x+j);
		}
	}
}

function showResult() {
	res.forEach((name, index) => {
		if (name != undefined) {
			result.innerHTML += `<div class="seat">
				<p class="name">${name}</p>
			</div>`
		}
	})
}

function setStyle() {
	x = document.getElementById("x").value;
	y = document.getElementById("y").value;
	var seats = document.getElementsByClassName("seat");
	Array.from(seats).forEach((seat) => {
		seat.style.width = `${(result.getBoundingClientRect().width - (x - 1) * 8) / x}px`;
		seat.style.height = `${(result.getBoundingClientRect().width - (x - 1) * 8) / x}px`;
	});
	requestAnimationFrame(setStyle);
}

function buttonSubmitted() {
	readData();
	generate();
	showResult();
}

document.getElementById("form").onsubmit = (e) => {
	e.preventDefault();
	buttonSubmitted();
}

setStyle();

textareaEle.forEach((ele) => {
	ele.oninput = () => {
		ele.style.height = 'auto';
		ele.style.height = `${ele.scrollHeight}px`;
	};
});
