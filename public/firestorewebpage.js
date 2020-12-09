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


      const docRef = firestore.doc("sampledocument/testdata");
      const outputheader = document.querySelector("#outputdata");
      const inputTextField = document.querySelector("#inputdata");
      const savebutton = document.querySelector("#savebutton");

      savebutton.addEventListener("click", function() {
        const textToSave = inputTextField.value;
        console.log("I am going to save" + textToSave + " to FireStore");
        docRef.set({
          inputdatas: textToSave
        }).then (function() {
          console.log("data saved!");
        }).catch(function (error) {
          console.log("Got an error: ", error);
        });
      })



      loadbutton.addEventListener("click", function() {
        docRef.get().then(function (doc) {
          if (doc && doc.exists) {
            const myData = doc.data();
            outputheader.innerText = "test: " + myData.inputdatas;
          }
        }).catch(function (error) {
          console.log("got an error: ", error);
        });
      });

      getrealtimeupdates = function() {
        docRef.onSnapshot(function (doc) {
          if (doc && doc.exists) {
            const myData = doc.data();
            console.log("check out this document I received", doc);
            outputheader.innerText = "" + myData.inputdatas;
          }
        });
      }

      getrealtimeupdates();
