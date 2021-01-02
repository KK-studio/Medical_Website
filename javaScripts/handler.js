var buttons1 = document.getElementsByClassName("loginLink")


for (var i = 0; i < buttons1.length; i++) {
    buttons1[i].addEventListener('click', redirectToLoginPage);
}

function redirectToLoginPage() {
    window.location.href = "loginPage.html";
}