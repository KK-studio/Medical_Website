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

parentNode= document.getElementById("middle-Part-userComments-peopleComments");
templateNode = parentNode.getElementsByClassName("middle-Part-userComments-peopleComments-box")[0]
console.log(templateNode)

function applyComments(){
    allComment = parentNode.querySelectorAll(".middle-Part-userComments-peopleComments-box")
    allComment.forEach(element=>{
        parentNode.removeChild(element)
    });
    comment_Array.forEach(element => {
        var clone = templateNode.cloneNode(true);
        clone.getElementsByClassName("middle-Part-userComments-peopleComments-box-header-owner")[0].innerHTML = element.name
        clone.getElementsByClassName("matn-comment")[0].innerHTML = element.comment
        parentNode.appendChild(clone)
    });
}

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

    var days = document.getElementsByClassName("day")
    for (i = 0; i < days.length; i++) {
        if (week_days[i] == true) {

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
                spec = data["spec"]
                avatar = data["avatar"]
                online_pay = data["online_pay"]
                // first_empty_date = data["first_empty_date"]
                experience_years = data["experience_years"]
                rate = parseInt(data["score"] * 5 );
                stars = parseInt(parseFloat(stars))
                comments = data["scores_count"]
                comment_text = data["last_Comment"]
                address = data["address"]
                phone = data["phone"]
                week_days = data["week_days"]
                comment_Array = data["comments"]
                if(comment_Array.length>0){
                    commenter = comment_Array[comment_Array.length-1].name
                }
                applyData()
                applyComments()
            })

}
var url_string = window.location.search;
const urlParams = new URLSearchParams(url_string);
const phoneDr = urlParams.get('phone')
console.log(phoneDr)
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