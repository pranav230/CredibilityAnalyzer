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

async function fillSuspectName() {
    var token = await database.ref('/users/' + sessionStorage.getItem('userKey') + '/suspectList/' + sessionStorage.getItem('suspectId'));
    await token.once('value', (snapshot) => {
        const data = snapshot.val();
        document.getElementById('suspectName').innerHTML = data['name'];
        document.getElementById('pre').value = data['hypo'];
        console.log(data['hypo']);
    });
}

async function analyse() {
    await fetch("https://localhost:8000/classify", {
        method: 'POST',
        body: JSON.stringify({
            premise: document.getElementById('pre').value,
            hypothesis: document.getElementById('hypo').value,
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
        .then(function (response) {
            return respopnse.json()
        })
        .then(text => {
            console.log(text);
        })
}