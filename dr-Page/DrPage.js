API = "https://intense-ravine-40625.herokuapp.com/doctors/"
comment_Array = []
Number = ""
Name = ""
spec = ""
avatar = ""
online_pay = false
first_empty_date = ""
experience_years = ""
stars = 0
rate = ""
commenter = ""
comments = ""
comment_text = ""
address = ""
phone = ""
week_days = []
const specialies = ["اعصاب و روان", "ارتوپد", "جراحی کمر", "غدد"]

parentNode= document.getElementById("middle-Part-userComments-peopleComments");
templateNode = parentNode.getElementsByClassName("middle-Part-userComments-peopleComments-box")[0]
console.log(templateNode)

//refresh page dynamiclly
function applyComments(){
    allComment = parentNode.querySelectorAll(".middle-Part-userComments-peopleComments-box")
    allComment.forEach(element=>{
        parentNode.removeChild(element)
    });
    comment_Array.forEach(element => {
        var clone = templateNode.cloneNode(true);
        clone.getElementsByClassName("middle-Part-userComments-peopleComments-box-header-owner")[0].innerHTML = element.name
        clone.getElementsByClassName("matn-comment")[0].innerHTML = element.comment
        
        //find all stars :)
        let current = clone.querySelector('.middle-Part-userComments-peopleComments-box-whiteSpace-reason');
        let nextSibling = current.nextElementSibling;
        var stars = [];
        while(nextSibling) {
            console.log(nextSibling);
            stars.push(nextSibling)   
            nextSibling = nextSibling.nextElementSibling;
        }
        for(var i = 0 ; i<5 ; i++){
            if(element.score > i){
                stars[i].classList.add('middle-Part-userComments-peopleComments-box-whiteSpace-starsOn');
            }else{
                stars[i].classList.remove('middle-Part-userComments-peopleComments-box-whiteSpace-starsOn');
            }
        }
        parentNode.appendChild(clone)
    });
}


//setup all  data that get from server
function applyData() {
    picElement = document.getElementById("DrPic")
    picElement.src = avatar
    document.getElementById("name").innerHTML = Name
    document.getElementById("way-3").innerHTML = " &#62" + Name
    document.getElementById("technition").innerHTML = spec
    document.getElementById("way-2").innerHTML = " &#62" + spec

    document.getElementById("number").innerHTML = Number
    document.getElementById("experience_years").innerHTML = experience_years
    document.getElementById("first_empty_date").innerHTML = first_empty_date
    if (online_pay) {
        document.getElementById("online_pay").innerHTML = "دارد"
    } else {
        document.getElementById("online_pay").innerHTML = "ندارد"

    }
    document.getElementById("comment_text").innerHTML = comment_text
    var stars1 = document.getElementsByClassName("feather-star")
    for (i = 0; i < stars; i++) {
        stars1[i].style.fill = "blue"
    }
    for (i = stars; i < stars1.length; i++) {
        stars1[i].style.fill = "white"
    }
    document.getElementById("commenter").innerHTML = commenter
    document.getElementById("comments").innerHTML = "از " + comments + " نفر"
    document.getElementById("rate").innerHTML = rate
    document.getElementById("phone").innerHTML = phone
    document.getElementById("address").innerHTML = address

    //setup date activity
    var days = document.getElementsByClassName("day")
    for (i = 0; i < days.length; i++) {
        console.log(week_days[i])
        if (week_days[i] == true || week_days[i] == "True") {

            days[i].getElementsByClassName("tik")[0].classList.add("appear");
            days[i].getElementsByClassName("tik")[0].classList.remove("hidden");

            days[i].getElementsByClassName("untik")[0].classList.remove("appear");
            days[i].getElementsByClassName("untik")[0].classList.add("hidden");


        } else {

            days[i].getElementsByClassName("untik")[0].classList.add("appear");
            days[i].getElementsByClassName("untik")[0].classList.remove("hidden");

            days[i].getElementsByClassName("tik")[0].classList.remove("appear");
            days[i].getElementsByClassName("tik")[0].classList.add("hidden");

        }
    }
}


//normal phase fetch from server
function fetchDrPAgeData(ID) {
    URL = API + ID
    fetch(URL)
        .then((resp) => resp.json())
        .then(
            (input) => {
                data = input
                Number = data["number"]
                Name = data["name"]
                spec = data["spec"]
                avatar = data["avatar"]
                online_pay = data["online_pay"]
                first_empty_date = data["first_empty_date"]
                experience_years = data["experience_years"]
                stars = data["stars"]
                rate = data["rate"]
                commenter = data["commenter"]
                comments = data["comments"]
                comment_text = data["comment_text"]
                address = data["address"]
                phone = data["phone"]
                week_days = data["week_days"]
                applyData()
            })

}


//our server
function fetchDrPAgeDataWithPhone(input) {
    URL = "http://127.0.0.1:8000/polls/user/getDoc/" + input + "/"
    console.log(URL)
    fetch(URL)
        .then((resp) => resp.json())
        .then(
            (input) => {
                console.log(input)
                data = input
                Number = data["number"]
                Name = data["name"]
                spec = specialies[data["spec"]]
                avatar = data["avatar"]
                online_pay = data["online_pay"]
                // first_empty_date = data["first_empty_date"]
                experience_years = data["experience_years"]
                rate = parseInt(data["score"]);
                stars = parseInt(parseFloat(rate))
                comments = data["scores_count"]
                comment_text = data["last_Comment"]
                address = data["address"]
                phone = data["phone"]
                week_days = data["week_days"]
                window.alert(week_days)
                comment_Array = data["comments"]
                if(comment_Array.length>0){
                    commenter = comment_Array[comment_Array.length-1].name
                }
                applyData()
                applyComments()
            })

}

//setupd listener of pages
function addListeners(){
    sendCommentButton.addEventListener('click',()=>{
        console.log("we catch ok : " + phoneDr)
        if(phoneDr){
            console.log(SendCommentTextArea.value)
            console.log(checkStarsComments())
            console.log(phonNumberUser)
            var sendData = {doc_phone : phoneDr ,phone : phonNumberUser , comment: SendCommentTextArea.value , score: checkStarsComments()}
            console.log(JSON.stringify(sendData))
            makeRequest('POST', "http://127.0.0.1:8000/polls/user/addComment", JSON.stringify(sendData)).then(function(data) {
            window.alert("hi" + data)
            data = JSON.parse(data)
            //final to do 
            comment_Array = data["comments"]
            applyComments()
            });
        }
    });
}

//calculate number of startss
function checkStarsComments(){
    for(var i = 1 ; i<6 ; i++){
        if(document.getElementById(i+"").checked){
            return i 
        }
    }
    return 0 
}


//code starts from here
var url_string = window.location.search;
const urlParams = new URLSearchParams(url_string);
const phoneDr = urlParams.get('phone')
const sendCommentButton = document.getElementsByClassName("btn btn-success send btn-sm")[0]
const SendCommentTextArea = document.getElementById("comment-text")
const phonNumberUser = localStorage.getItem("UserPhonNemerDarmankade");
// console.log(SendCommentText)



addListeners()


if(phoneDr){
    console.log("send")
    fetchDrPAgeDataWithPhone(phoneDr);
}else{
    fetchDrPAgeData("2");
}
document.getElementById("middle-Part-loaction-title2").onclick = () => {
    document.getElementById("middle-Part-loaction-title2").style.backgroundColor = "white";
    document.getElementById("middle-Part-loaction-title1").style.backgroundColor = "lightblue";

    document.getElementById("middle-Part-loaction-content-days").classList.add("appear");
    document.getElementById("middle-Part-loaction-content-days").classList.remove("hidden");
    document.getElementById("middle-Part-loaction-content").classList.add("hidden");
    document.getElementById("middle-Part-loaction-content").classList.remove("appear");
}

document.getElementById("middle-Part-loaction-title1").onclick = () => {
    document.getElementById("middle-Part-loaction-title1").style.backgroundColor = "white";
    document.getElementById("middle-Part-loaction-title2").style.backgroundColor = "lightblue";

    document.getElementById("middle-Part-loaction-content-days").classList.add("hidden");
    document.getElementById("middle-Part-loaction-content-days").classList.remove("appear");
    document.getElementById("middle-Part-loaction-content").classList.add("appear");
    document.getElementById("middle-Part-loaction-content").classList.remove("hidden");
}

function makeRequest(method, url, data) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        if (method == "POST" && data) {
            xhr.send(data);
        } else {
            xhr.send();
        }
    });
}
