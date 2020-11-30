//variable
let imageUrl = null;

//layout binding
const inputname = $("#nameid");
const inputChoice = $("#choice");
const inputTitle = $("#title");
const inputEmail = $("#email");
const inputDescription = $("#description");
const inputFile = $("#file");
const summitButton = $("#summit");
const progressStatus = $("#progress");

const contactReference = db.collection("contact");
const dataId = "";

const companyReference = db.collection("company");
const newsReference = db.collection("notice");

const bizMenu = $("#biz_menu");
const bizMenuFooter = $("#biz_menu_footer");
const newsList = $("#news_list");

$(document).on('ready', function () {

    inputFile.on("change", (e)=>{

        const file = inputFile[0].files[0];
        console.log(file);

        let storageRef = storage.ref();
        let imageRef = storageRef.child("files");

        let spaceRef = imageRef.child(file.name);
        let uploadTask = spaceRef.put(file);

        uploadTask.on("state_changed", function(snapShot){

            let progress = (snapShot.bytesTransferred/ snapShot.totalBytes) * 100;
            console.log(progress);
            progressStatus.text(Number(progress)+"%");
            if(Number(progress) == 100){
                progressStatus.text("완료");
            }

            switch (snapShot.state){
                case firebase.storage.TaskState.PAUSED:
                    console.log("upload paused");
                    break;
                case firebase.storage.TaskState.RUNNUNG:
                    console.log("ruung");
                    break;
            }

        },function(error){
            console.log(error);
        }, function(){
            console.log("make url");
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadUrl){
                console.log(downloadUrl);
                imageUrl = downloadUrl;
            }).catch(function(error){
                console.log(error);
            })
        })

    })

    summitButton.on("click", ()=>{

        const nameid = inputNameid.val();
        const choice = inputChoice.val();
        const title = inputtitle.val();
        const email = inputEmail.val();
        const description = inputDescription.val();
        const file = inputFile[0]

        let saveData = {
            nameid:name,
            choice:choice,
            title:title,
            email:email,
            description:description,
            status:true,
            open_flag:true,
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt:firebase.firestore.FieldValue.serverTimestamp()
        }

        console.log(saveData);

        if(imageUrl != null){
            saveData["file"] = imageUrl;
        }

        const document = contactReference.doc();
        document.set(saveData).then((snapshot)=>{
            console.log(snapshot);
            alert("완료");
            location.reload();
        }).catch((error)=>{
            console.log(error);
            alert("Error.")
        })

    })

    makeMenuAndFooter();
    makeNewsList();


})