console.log("java script is loaded")
main()



function main(){
    // console.log("we run the main")
    var buttons = document.getElementsByClassName("defaultbutton")
    console.log(buttons.length)

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', redirectToDoctorsPage);
    }
}




//go to neurologist
function redirectToDoctorsPage(){
    window.location.href = "neurologist.html";
}

