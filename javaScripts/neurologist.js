console.log("js is loaded")

var listOfDoctors
const MY_URL = "https://intense-ravine-40625.herokuapp.com/doctors"
var drTemplate
var parentNode


main()

function main(){
    drTemplate = document.querySelector(".dr")
    parentNode = document.querySelector("#neurologist-section-parent>div")
    // console.log(parentNode)
    getIntialData()
    // در این بخش دکتر ها را دریافت می کنیم
}


function getIntialData() {
    // remove template html for  file and then replace real doctors
    parentNode.removeChild(drTemplate);

    // now we gor for fetching data and setup real page
    fetch(MY_URL)
    .then((resp) => resp.json())
    .then(
      (data) =>
        {
            listOfDoctors = data;
            console.log(data[0])

            data.forEach(element => {
                var clone = drTemplate.cloneNode(true);
                clone.querySelector(".dr-rightSide>img").src = element.avatar  // image
                clone.querySelector(".dr-centeral>h1").innerHTML = element.name
                clone.querySelector(".dr-centeral>h2").innerHTML = element.spec

            //    stars
                var stars= clone.querySelectorAll(".dr-centeral-stars>svg")
                for(var i=0 ; i< element.stars ; i++){
                    stars[i].style.fill = "blue";
                }

                // comments number
                clone.querySelector(".dr-centeral-stars>p").innerHTML = `(نظر ${element.comments})`
                
                clone.querySelector(".dr-centeral>p").innerHTML = element.comment_text

                // clone.querySelector(".dr-leftSide-status")

                parentNode.appendChild(clone)
               
            });

            // var clone = elem.cloneNode(true);
            // console.log(clone)

            // listOfShips.forEach(element => {
            //     document.getElementById("leftMenu").innerHTML += `<div class="menuContent">${element.name}</div>`
            // });

            // var rows = document.getElementsByClassName("menuContent")

            // for(var i= 0 ; i < rows.length;i++){
            //     rows[i].addEventListener('click',clickedShip)
            // }
        }
    )
}