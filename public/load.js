      const nameiddb= document.querySelector("#nameid");
      const choicedb= document.querySelector("#choice");
      const titledb = document.querySelector("#title");
      const emaildb = document.querySelector("#email");
      const descriptiondb = document.querySelector("#description");
      const boarddb = document.querySelector("#boarddb");
      const loadbutton = document.querySelector("#loadbutton");
      const docref =firestore.doc("samples/testdata");

loadbutton.addEventListener("click", function() {
    docref.get().then(function (doc) {
      if (doc && doc.exists) {
        const myData = doc.data();
        boarddb.innerText = "" + myData.boarddb;
      }
    }).catch(function(error) {
      console.log("Got an error: ", error);
    });
  });

  getrealtimeupdates = function() {
    docref.onSnapshot({includeMetadataChanges: true}, function (doc) {
      if (doc && doc.exists) {
        const myData = doc.data();
        console.log("check out this document I received", doc);
        boarddb.innerText = "" + myData.boarddb;
      }
    });
  }

  getrealtimeupdates();