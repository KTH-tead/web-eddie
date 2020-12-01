var firebaseConfig = {
    apiKey: "AIzaSyDU2-mdRegFPE0hj8Fo2ZTQnQSfU6LXrd0",
    authDomain: "web-eddie.firebaseapp.com",
    databaseURL: "https://web-eddie.firebaseio.com",
    projectId: "web-eddie",
    storageBucket: "web-eddie.appspot.com",
    messagingSenderId: "855618318554",
    appId: "1:855618318554:web:0bf1d3df5e3b25356675e3",
    measurementId: "G-VFFF25V6F1"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var firestore = firebase.firestore();

  const docref =firestore.doc("samples/testdata");
  const inputText1= document.querySelector("#nameid");
  const inputText2 = document.querySelector("#title");
  const inputemail = document.querySelector("#email");
  const inputText3 = document.querySelector("#description");
  const submitbutton = document.querySelector("#submit");

  submitbutton.addEventListener("click", function() {
    const textToSave = inputText1.value; inputText2.value; inputText3.value; inputemail.value;
    console.log("I am going to save " + textToSave + " to Firestore");
    docref.set({
      test1: textToSave
    }).then(function() {
        console.log("status saved!");
    }).catch(function (error) {
        console.log("got an error:", error);
    });
} )


