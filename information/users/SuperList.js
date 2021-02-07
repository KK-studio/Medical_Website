
const g_name = document.getElementById("name");
const g_password = document.getElementById("password");
const g_phone = document.getElementById("phone");



main();




function main(){
    loadCurrentDate();
    // listeners
    document.getElementById("save").addEventListener('click', upload)
}
function upload(e){
    var sendData ={
        name: g_name.value,
        password: g_password.value,
        phone : g_phone.value
    }
    console.log(JSON.stringify(sendData));
    makeRequest('POST', "http://127.0.0.1:8000/polls/user/editUser", JSON.stringify(sendData)).then(function(data) {
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
    var phone =localStorage.getItem("UserPhonNemerDarmankade");
    console.log("saved PhoneNember : " +  phone);

    makeRequest('GET', "http://127.0.0.1:8000/polls/user/getUser/"+phone).then(function(data) {
        alert(data);
        if (data != null) {
            var result = JSON.parse(data);
            g_name.value = data["name"];
            g_password.value = data["password"]
            g_phone.value = data["phone"]

        } else {
            location.reload();
        }
    });
}