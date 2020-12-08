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
// FirebaseUI config.
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: 'index.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

<<<<<<< HEAD
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
      var firestore = firebase.firestore();

      const docref =firestore.doc("samples/testdata");
      const outputheader = document.querySelector("#test");
      const inputTextField = document.querySelector("#test1");
      const savebutton = document.querySelector("#savebutton");
      const loadbutton = document.querySelector("#loadbutton");

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

      loadbutton.addEventListener("click", function() {
        docRef.get().then(function (doc) {
          if (doc && doc.exists) {
            const myData = doc.data();
            outputheader.innerText = "test: " + myData.test1;
          }
        }).catch(function (error) {
          console.log("got an error: ", error);
        });
      });

=======
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
>>>>>>> 3f321096d1098210921b7a8cd27e6048efed0984
