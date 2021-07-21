var firebaseConfig = {
  apiKey: "AIzaSyDKcPIMTtBcCr5CH2e5AKFmFya8z8vP81g",
  authDomain: "credibility-analyzer-3c82f.firebaseapp.com",
  projectId: "credibility-analyzer-3c82f",
  storageBucket: "credibility-analyzer-3c82f.appspot.com",
  messagingSenderId: "373902736528",
  appId: "1:373902736528:web:703cc3797a9fc88b51ec15",
  // measurementId: "G-YPVY8Q4DLQ"
};

firebase.initializeApp(firebaseConfig);

//firebase.analytics();
const auth = firebase.auth();

function signUp() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then(res => {
    console.log(res);
    window.location.href = "./pages/submission.html";
  }
  ).catch((error) => {
    console.log(error["code"]);
    alert(error);
  });
  // console.log(promise);
  // promise.catch(e => alert(e.message));

  // alert("Signed Up");
}

function signIn() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var res;
  // const promise = auth.signInWithEmailAndPassword(email.value, password.value);
  firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(res => {
    console.log(res);
    window.location.href = "./pages/submission.html";
  }
  ).catch((error) => {
    console.log(error["code"]);
    alert(error);
  });
}

function signOut() {
  window.location.href = "../index.html";
  console.log("signed out");
  alert("Signed out");
}

// auth.onAuthStateChanged(function(user)
// {
//     if(user)
//     {
//       var email = user.email;
//       alert("Active User: "+ email);    
//     }
//     else{
//       alert("No active user.");
//     }
// });
//</script>