
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
      const outputheader = document.querySelector("#test");
      const inputTextField = document.querySelector("#test1");
      const savebutton = document.querySelector("#savebutton");

      savebutton.addEventListener("click", function() {
          const textToSave = inputTextField.value;
          console.log("I am going to save " + textToSave + " to Firestore");
          docref.set({
            test1: textToSave
          }).then(function() {
              console.log("status saved!");
          }).catch(function (error) {
              console.log("got an error:", error);
          });
      } )