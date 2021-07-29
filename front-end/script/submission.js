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
    document.getElementById("submit").addEventListener("click", function (event) {
        event.preventDefault();
    }, false);
    var token = await database.ref('/users/' + sessionStorage.getItem('userKey') + '/suspectList/' + sessionStorage.getItem('suspectId'));
    await token.once('value', (snapshot) => {
        const data = snapshot.val();
        document.getElementById('suspectName').innerHTML = data['name'];
        document.getElementById('pre').value = data['hypo'];
        console.log(data['hypo']);
    });
}

async function analyse() {
    await fetch("http://localhost:8000/classify/", {
        method: 'POST',
        //mode: 'cors',
        //Access-Control-Allow-Headers:"Content-Type, Authorization",
        body: JSON.stringify({
            premise: document.getElementById('pre').value,
            hypothesis: document.getElementById('hypo').value,
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization":"Basic c2hhc2h2YXQ6cGFuZGV5",
            //"Access-Control-Allow-Methods":"POST",
            //"Access-Control-Allow-Headers":"Content-Type, Authorization"

        }
    })
        .then(function (response) {
            console.log(response);
            return response.json()
        })
        .then(function (text) {
            console.log(text);
        })
        .catch(err => {console.log(err)
        })
        setTimeout(async function () {
        await database.ref('/ans/result/').once('value', (snapshot) => {
            const data = snapshot.val();
            document.getElementById('res').value = data;
        });
    }, 200);
}