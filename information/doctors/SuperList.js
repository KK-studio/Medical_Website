const days = document.getElementsByClassName("days");
const g_name = document.getElementById("name");
const g_password = document.getElementById("password");
const g_phone = document.getElementById("phone");
const g_Specialty = document.getElementById("Specialty");
const g_number = document.getElementById("number");
const g_expreince_years = document.getElementById("expreinceyears");
const g_online_pay = document.getElementById("online_pay");
const g_addressTextArea = document.getElementById("addressTextArea");

const daysStat = [];
for(var i =0 ; i<7 ; i++){
    daysStat[i]=false;
}

main();

function main(){
    loadCurrentDate();
    console.log("hello");
    console.log(days);


    // listeners
    document.getElementById("save").addEventListener('click', upload)
    for(var i =0 ; i<days.length;i++){
        days[i].addEventListener('click', (e) =>
        {
            console.log(e.target.innerHTML)
            switch(e.target.innerHTML ){
                case "saturday":
                    togleDay(0,e);
                    break;
                case "sunday":
                    togleDay(1,e);
                    break;
                case "monday":
                    togleDay(2,e);
                    break;
                case "tuesday":
                    togleDay(3,e);
                    break;
                case "wednesday":
                    togleDay(4,e);
                    break;
                case "thrusday":
                    togleDay(5,e);
                    break;
                case "friday":
                    togleDay(6,e);
                    break;
                default:
                    alert("this day is not in week");                  
                
            }
        });
    }
}

function togleDay(number , e){
    if(daysStat[number]===true){
        daysStat[number] = false;
        e.target.style.color = "black";
        e.target.style.backgroundColor = "white";
    }else{
        daysStat[number]=true;
        e.target.style.color = "white";
        e.target.style.backgroundColor = "black";
    }
}


function upload(e){
    //ok
    var sendData ={
        name: g_name.value,
        password: g_password.value,
        phone : g_phone.value,
        spec:parseInt( g_Specialty.value),
        address:g_addressTextArea.value,
        experience_years:parseInt(g_expreince_years.value),
        number: parseInt( g_number.value),
        online_pay: g_online_pay.checked,
        week_days : daysStat
    }
    console.log(JSON.stringify(sendData));
    makeRequest('POST', "http://127.0.0.1:8000/polls/user/editDoc", JSON.stringify(sendData)).then(function(data) {
        window.alert("hi" + data)
        if (data == "ok") {
            console.log("ok")
        } else {
            location.reload();
        }
        // var results = JSON.parse(data);
        // if (results["state"] == true) {
        //     //to do  login
        // } else {
        //     location.reload();
        // }
    });
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

function loadCurrentDate(){
    var phone =localStorage.getItem("DRphonNemerDarmankade");
    console.log("saved PhoneNember : " +  phone);

    makeRequest('POST', "http://127.0.0.1:8000/polls/user/getDoc/"+phone+"/").then(function(data) {
        alert(data);
        if (data != null) {
            var result = JSON.parse(data);
            g_name.value = result["name"];
            g_password.value = result["password"];
            g_phone.value = result["phone"];
            g_Specialty.value = result["spec"];
            g_expreince_years.value = result["experience_years"];
            g_number.value = result["number"];
            g_online_pay = result["online_pay"];
            var boolDays = result["week_days"]
            console.log("array true false : " + boolDays);
            for(var j=0 ; j<boolDays.length ; j++){
                if(boolDays[j]){
                    days[j].style.color = "white";
                    days[j].style.backgroundColor = "black";
                }
            }

        } else {
            location.reload();
        }
    });
}