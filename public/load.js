
      const nameiddb= document.querySelector("#nameid");
      const choicedb= document.querySelector("#choice");
      const titledb = document.querySelector("#title");
      const emaildb = document.querySelector("#email");
      const descriptiondb = document.querySelector("#description");
      const boarddb = document.querySelector("#boarddb");
      const loadbutton = document.querySelector("#loadbutton");

      //<-- 실패 -->
      const makeli = (dataset) =>{
          boarddb.empty();
          let counter = 0;

          dataset.forEach(item =>{
              counter += 1;
              const id = item.id;
              const data = item.data();
              dataArray.push(data);

              const nameid = data.nameid;
              const choice = data.choice;
              const title = data.title;
              const email = data.email;
              const description = data.description;

              if(description.length ==0){
                description = "";
            } else {
                description = description.substring(0,30);
            }

            let dataResult = "<li class='col'>"+ counter +"</li>";
            dataResult += "<li class='col'>"+ nameid +"</li>";
            dataResult += "<li class='col'>"+ choice +"</li>";
            dataResult += "<li class='col'>"+ title +"</li>";
            dataResult += "<li class='col'>"+ email +"</li>";
            dataResult += "<li class='col'>"+ description +"</li>";

            boarddb.append(dataResult);


            boarddb.on("click", function() {
                docref.onSnapshot()
                console.log(e.currentTarget);
                target = e.currentTarget;
                const index = target.children[0].innerText;
                const indexNum = Number(index);

                const selectedItem = dataArray[indexNum-1];
                console.log(selectedItem);

                nameiddb.text(selectedItem.nameid);
                choicedb.text(selectedItem.choice);
                titledb.text(selectedItem.title);
                emaildb.text(selectedItem.email);
                descriptiondb.text(selectedItem.description);
          })
    })
}
      //<-- 실패 -->

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