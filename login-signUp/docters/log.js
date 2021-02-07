const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const submitLogin = document.getElementById("signInSubmit");
const submitSignUp = document.getElementById("signUpSubmit");

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

submitLogin.addEventListener('click', (e) => { //login
    console.log("sign in");
    e.preventDefault();
    var myForm = document.getElementById("loginForm");

    var sendData = `{"phone":"${myForm.elements[0].value}" , "password":"${myForm.elements[1].value}"}`
    console.log(sendData);

    makeRequest('POST', "http://127.0.0.1:8000/polls/user/docSignup", sendData).then(function(data) {
        if (data == "ok") {
            console.log("ok")
        } else {
            location.reload();
        }
    });
});

submitSignUp.addEventListener('click', (e) => {
    console.log("sign up");
    e.preventDefault();
    var myForm = document.getElementById("signupForm");
    var sendData = `{"name":"${myForm.elements[0].value}" , "phone":"${myForm.elements[1].value}" , "password":"${myForm.elements[2].value}"}`
    console.log(sendData);


    makeRequest('POST', "http://127.0.0.1:8000/polls/user/docSignup", sendData).then(function(data) {
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

});

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

//GET example