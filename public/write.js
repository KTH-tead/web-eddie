
  //<-- 하단에 언급된 것처럼 value 값을 한번에 const로 정의 해버리면 됨! start -->
  const nameid= document.querySelector("#nameid");
  const choice= document.querySelector("#choice");
  const title = document.querySelector("#title");
  const email = document.querySelector("#email");
  const description = document.querySelector("#description");
  //<-- 하단에 언급된 것처럼 value 값을 한번에 const로 정의 해버리면 됨! end -->

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


  const docRef = firestore.doc("sampledocument/multidata");
  const submitbutton = document.querySelector("#submit");

  submitbutton.addEventListener("click", ()=>{
    const nameiddata = nameid.value;
    const choicedata = choice.value;
    const titledata = title.value;
    const emaildata = email.value;
    const descriptiondata = description.value;
    console.log("I am going to save " + nameid + " to Firestore");
    docRef.set({
      nameid: nameiddata,
      choice: choicedata,
      title: titledata,
      email: emaildata,
      description : descriptiondata,
    }).then(function() {
        console.log("status saved!");
    }).catch(function (error) {
        console.log("got an error:", error);
    });
} )

