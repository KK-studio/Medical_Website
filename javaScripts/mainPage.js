var buttons = document.getElementsByClassName("technitionBar")
    //set onclick for page linking to medical-specialists
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', redirectToDoctorsPage);
}



var buttons = document.getElementsByClassName("technitionLink")
    //set onclick for page linking to neurologist
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', redirectToTechnitionsPage);
}



function redirectToTechnitionsPage() {
    window.location.href = "medical-specialties.html";
}


function redirectToDoctorsPage() {
    window.location.href = "neurologist.html";
}