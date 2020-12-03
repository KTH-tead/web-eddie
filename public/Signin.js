import firebase from "firebase/app";
import "firebase/auth";

function signInWithEmailPassword() {
  var email = "test@example.com";
  var password = "hunter2";
  // [START auth_signin_password]
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      // Signed in
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  // [END auth_signin_password]
}

function signUpWithEmailPasswoerd() {
  var email = "test@example.com";
  var password = "hunter2";
  // [START auth_signup_password]
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      // Signed in
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  // [END auth_signup_password]
}

function sendEmailVerification() {
  // [START auth_send_email_verification]
  firebase.auth().currentUser.sendEmailVerification()
    .then(() => {
      // Email verification sent!
      // ...
    });
  // [END auth_send_email_verification]
}

function sendPasswordReset() {
  const email = "sam@example.com";
  // [START auth_send_password_reset]
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  // [END auth_send_password_reset]
}

ui.start('#firebaseui-auth-container', {
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // Use email link authentication and do not require password.
        // Note this setting affects new users only.
        // For pre-existing users, they will still be prompted to provide their
        // passwords on sign-in.
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        // Allow the user the ability to complete sign-in cross device, including
        // the mobile apps specified in the ActionCodeSettings object below.
        forceSameDevice: false,
        // Used to define the optional firebase.auth.ActionCodeSettings if
        // additional state needs to be passed along request and whether to open
        // the link in a mobile app if it is installed.
        emailLinkSignIn: function() {
          return {
            // Additional state showPromo=1234 can be retrieved from URL on
            // sign-in completion in signInSuccess callback by checking
            // window.location.href.
            url: 'https://www.example.com/completeSignIn?showPromo=1234',
            // Custom FDL domain.
            dynamicLinkDomain: 'example.page.link',
            // Always true for email link sign-in.
            handleCodeInApp: true,
            // Whether to handle link in iOS app if installed.
            iOS: {
              bundleId: 'com.example.ios'
            },
            // Whether to handle link in Android app if opened in an Android
            // device.
            android: {
              packageName: 'com.example.android',
              installApp: true,
              minimumVersion: '12'
            }
          };
        }
      }
    ]
  });