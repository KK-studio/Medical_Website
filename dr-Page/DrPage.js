API = "https://intense-ravine-40625.herokuapp.com/doctors/"
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
        document.getElementById("number").innerHTML = "دارد"
    } else {
        document.getElementById("number").innerHTML = "ندارد"

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
fetchDrPAgeData("2");
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