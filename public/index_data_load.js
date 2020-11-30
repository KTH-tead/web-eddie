
const dataList = $("#data_list");
const dataArray = [];

const dataName = $("#data_name");
const dataEmail = $("#data_email");
const dataPhone = $("#data_phone");
const dataCompany = $("#data_company");
const dataDescription =$("#data_description");
const dataChice = $("#data_choice");
const dataFile = $("#data_file");

const detailModal = $("#detailModal");

let target = null;

const contactReference = db.collection("contact");


const makeTable = (dataSet)=>{

    dataList.empty();
    let counter = 0;

    dataSet.forEach(item =>{
        counter += 1;
        const id = item.id;
        const data = item.data();
        dataArray.push(data);

        const nameid = data.name;
        const choice = data.choice;
        const title = data.title;
        const email = data.email;
        let description = data.description;
        const file = data.file;


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
        dataResult += "<li class='col'>"+ file +"'>파일보기</li>"

        dataList.append(dataResult);

        dataList.on("click","tr", (e)=>{

            console.log(e.currentTarget);
            target = e.currentTarget;
            const index = target.children[0].innerText;
            const indexNum = Number(index);

            const selectedItem = dataArray[indexNum-1];
            console.log(selectedItem);

            dataName.text(selectedItem.name);
            dataChoice.text(selectedItem.choice);
            datatitle.text(selectedItem.title);
            dataEmail.text(selectedItem.email);
            dataDescription.text(selectedItem.description);
            dataCompany.text(selectedItem.company);
            dataFile.attr("href", selectedItem.file);

            detailModal.modal("show");

          })

    })

}

$(document).on('ready', function () {

    contactReference.where("status" , "==",true).get().
        then((snapShots)=>{
            makeTable(snapShots);
        }).catch((error)=>{
            console.log(error);
        })
})