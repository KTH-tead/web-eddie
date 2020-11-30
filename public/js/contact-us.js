//variable
let imageUrl = null;

//layout binding
const inputName = $("#nameid");
const inputPhone = $("#phone");
const inputEmail = $("#email");
const inputCompany = $("#company");
const inputChoice = $("#choice");
const inputDescription = $("#description");
const inputFile = $("#file");
const summitButton = $("#summit");
const progressStatus = $("#progress");

const contactReference = db.collection("contact");
const dataId = "cxZPwwyaYlWlCQKmFn6i";

const companyReference = db.collection("company");
const newsReference = db.collection("notice");

const bizMenu = $("#biz_menu");
const bizMenuFooter = $("#biz_menu_footer");
const newsList = $("#news_list");



const makeNews = (dataSet)=>{
    dataSet.forEach(item =>{
        const data = item.data();

        let element = '<li class="nav-item"><a class="nav-link" href="newsroom.html">'+data.title+'</a></li>';

        newsList.append(element);
    })
}


const makeMunu = (dataSet)=>{

    dataSet.forEach(item =>{

        let element = '<span class="d-block h5">' + item.category + '</span>';

        const list = item.biz_items;

        list.forEach(subItem =>{

            element += '<a class="dropdown-item pre-wrap" href="index.html#businesstogo">'+ subItem.title +'</a>';

        })

        element += '<hr>';

        bizMenu.append(element);
    })

}

const makeMenuFooter = (dataSet)=>{
    dataSet.forEach(item =>{

        let element = '<div class="col-lg-12">';
        element += '<h5 class="text-white">' + item.category + '</h5>';
        element += '<ul class="nav nav-sm nav-x-0 nav-white flex-column mb-5">';

        const list = item.biz_items;

        list.forEach(subItem =>{

            element += '<li class="nav-item"><a class="nav-link" href="index.html#businesstogo">' + subItem.title + '</a></li>';

        })

        element += '</ul>';
        element += '</div>';

        bizMenuFooter.append(element);
    })
}


const makeBizDataSet = (dataSet)=>{

    const id = dataSet.id;
    const data = dataSet.data();
    const bizDataArray = data.biz_list;

    //make list;
    //define list to exist array;
    if(bizDataArray != null){

        let bizArray = [];
        let categoryArray = [];

        bizDataArray.forEach(item =>{

            const category = item.category;
            if(!categoryArray.includes(category)){
                categoryArray.push(category);
            }
        })

        categoryArray.forEach(item =>{

            let targetArray = [];
            bizDataArray.forEach(bizItem =>{
                const bizCategory = bizItem.category;
                if(item == bizCategory){
                    targetArray.push(bizItem);
                }
            })

            let saveData = {
                category:item,
                biz_items:targetArray
            }

            bizArray.push(saveData);
        })

        makeMunu(bizArray);
        makeMenuFooter(bizArray);

    }

}


const makeMenuAndFooter = ()=>{
    companyReference.doc(dataId).get().
        then((snapShots)=>{
            makeBizDataSet(snapShots);
        }).catch((error)=>{
            console.log(error);
        })
}

const makeNewsList = ()=>{
    newsReference.where("status" , "==",true).orderBy("createdAt", "desc").limit(10).get().
        then((newsDatas)=>{
            makeNews(newsDatas);
        }).catch((error)=>{
            console.log(error);
        })
}

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

        const name = inputName.val();
        const phone = inputPhone.val();
        const email = inputEmail.val();
        const company = inputCompany.val();
        const choice = inputChoice.val();
        const description = inputDescription.val();
        const file = inputFile[0]

        let saveData = {
            name:name,
            phone:phone,
            email:email,
            company:company,
            choice:choice,
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
            alert("제출이 완료 되었습니다. 내용 확인 후 연락 드리겠습니다. 감사합니다.");
            location.reload();
        }).catch((error)=>{
            console.log(error);
            alert("문제가 발생했습니다. 다시 시도해주세요.")
        })

    })

    makeMenuAndFooter();
    makeNewsList();


})