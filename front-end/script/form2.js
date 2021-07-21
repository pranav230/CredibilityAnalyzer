// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "AIzaSyB1S6V1jdDMCK8RLihSlJ0kR1uMVeDJZlM",
	authDomain: "credibility-analyser.firebaseapp.com",
	projectId: "credibility-analyser",
	storageBucket: "credibility-analyser.appspot.com",
	messagingSenderId: "937128837506",
	appId: "1:937128837506:web:11e508fda0baf94c570f9b",
	measurementId: "G-J6E68069FX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const database = firebase.database();

var theUserId;
var suspectList;

async function signUp() {
	//Jai bhole nath
	//get the email id and password
	var email = document.getElementById("email");
	var password = document.getElementById("password");
	if (email.value == "" || password.value == "") {
		alert('Please input both ID and password');
		return;
	}
	console.log(email.value + '-' + password.value);
	var duplicateFound = false;
	//Look for the email in the records, if it exist then tell it exists
	var token = await database.ref('/users/');
	await token.once('value', (snapshot) => {
		const data = snapshot.val();
		for (var i in data) {
			// console.log(data[i]["email"]);
			if (data[i]["email"] == email.value) {
				console.log('Duplicate found');
				alert('The id already exists, please login\n');
				duplicateFound = true;
				return;
			}
		}
	});
	if (duplicateFound == false) {
		token.push().set({
			email: email.value,
			password: password.value,
		});
		alert('Account created');
	}
}

async function signIn() {
	var email = document.getElementById("email");
	var password = document.getElementById("password");
	if (email.value == "" || password.value == "") {
		alert('Please input both ID and password');
		return;
	}
	var idFound = false;
	var token = await database.ref('/users/');
	await token.once('value', (snapshot) => {
		const data = snapshot.val();
		for (var i in data) {
			if (data[i]["email"] == email.value && data[i]["password"] == password.value) {
				theUserId = i;
				sessionStorage.setItem("userKey", theUserId);
				console.log('ID is' + i);
				idFound = true;
				suspectList = data[i]["suspectList"];
				sessionStorage.setItem("suspectList", JSON.stringify(suspectList));
				console.log(suspectList);
				window.location.href = "./pages/selectSuspect.html";
			}
		}
	});
	if (idFound == false) {
		alert('Please enter correct id and password');
		return;
	}
}

function fillSuspectList() {
	var thelist = JSON.parse(sessionStorage.getItem("suspectList"));
	for (let k in thelist) {
		$(document).ready(function () {
			$('#outerdiv').append('<div class="card"><h5 class="card-header">' + 'Crime: ' + thelist[k]['crime'] + '</h5><div class="card-body"><h5 class="card-title">' + 'Suspect name : ' + thelist[k]['name'] + '</h5><p class="card-text">' + 'Date of birth: ' + thelist[k]['dob'] + '</p><a href="#" class="btn btn-primary" onclick="goToSubmission(\'' + k + '\')">Enter Statement</a></div></div>');
		});
		console.log(thelist[k]['name'] + ' ' + thelist[k]['phone'] + ' ' + thelist[k]['dob']);
	}
}


function goToSubmission(suspectId) {
	sessionStorage.setItem("suspectId", suspectId);
	console.log('suspect id is ' + sessionStorage.getItem("suspectId"));
	window.location.href = "./submission.html";
}

function signOut() {
	window.location.href = "../index.html";
	console.log("signed out");
	alert("Signed out");
}

function showInputForm() {
	document.getElementById("showInputForm").style.display = "block";
	document.getElementById("showSelectSuspect").style.display = "none";
}

function showSelectSuspect() {
	document.getElementById("showInputForm").style.display = "none";
	document.getElementById("showSelectSuspect").style.display = "block";
}

function storeSuspectData() {
	var name = document.getElementById("name").value;
	var height = document.getElementById("height").value;
	var weight = document.getElementById("weight").value;
	var idnumber = document.getElementById("idnumber").value;
	var dob = document.getElementById("dob").value;
	var crime = document.getElementById("crime").value;
	var hypo = document.getElementById("hypo").value;
	var gender;

	if (document.getElementById("male").checked) {
		gender = 'male';
	}
	else if (document.getElementById("female").checked) {
		gender = 'female';
	}
	console.log(sessionStorage.getItem("userKey") + ' ' + name + ' ' + height + ' ' + weight + ' ' + idnumber + ' ' + dob + ' ' + gender + ' ' + crime + ' ' + hypo);
	// var token = await database.ref('/users/' + sessionStorage.getItem("userKey") + '/suspectList/');
	// token.push().set({
	// 	name: name,
	// 	height: height,
	// 	weight: weight,
	// 	idnumber: idnumber,
	// 	dob: dob,
	// 	gender: gender,
	// 	crime: crime,
	// 	hypo: hypo,
	// });

	database.ref('/users/' + sessionStorage.getItem("userKey") + '/suspectList/').push().set({
		name: name,
		height: height,
		weight: weight,
		idnumber: idnumber,
		dob: dob,
		gender: gender,
		crime: crime,
		hypo: hypo,
	});
	alert('Record added successfully');
}