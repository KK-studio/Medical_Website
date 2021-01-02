console.log("js is loaded")

var listOfDoctors
const MY_URL = "https://intense-ravine-40625.herokuapp.com/doctors"
var drTemplate
var parentNode
var data

main()

function main(){
    drTemplate = document.querySelector(".dr")
    parentNode = document.querySelector("#neurologist-section-parent>div")
    // console.log(parentNode)
    getIntialData()
    // در این بخش دکتر ها را دریافت می کنیم

    addEventListenerToSorters();
}


function addEventListenerToSorters(){
    var buttons = document.querySelectorAll(".sorting-choice")
    buttons.forEach(element => {
        if(element.innerHTML ==="بیشترین رضایتمندی "){
            element.addEventListener('click', sortByPercent);
        }
    });
}

function sortById(event){
    var lastElement = document.getElementsByClassName("sorting-choice-active")[0]
    lastElement.className = "sorting-choice"
    // color of option chang to blue
    event.target.className = "sorting-choice-active"

    //first delete all things
    allDr = document.querySelectorAll(".dr")
    allDr.forEach(element=>{
        parentNode.removeChild(element)
    });

    for(var i=0 ; i<data.length;i++){
        makeDr(data[i])
    }

}

function sortByPercent(event){
    // last button get blue
    // listener of sort by id set in first time that you click on sortBypercent
    var lastElement = document.getElementsByClassName("sorting-choice-active")[0]
    lastElement.className = "sorting-choice"
    lastElement.addEventListener("click",sortById)
    

    // color of option chang to blue
    event.target.className = "sorting-choice-active"
    //first delete all things
    allDr = document.querySelectorAll(".dr")
    allDr.forEach(element=>{
        parentNode.removeChild(element)
    });

    // find Best
    let capturedIndexes = new Array()
    for(var i=0 ; i < data.length ; i++){
        let max = 0
        let target = 0
        for(var j=0 ; j<data.length; j++){
            if(data[j].user_percent >= max && !capturedIndexes.includes(j)){
                target = j
                max = data[j].user_percent
            }
        }
        capturedIndexes.push(target)
        // console.log(target)
        // console.log(data[target])
        makeDr(data[target])
    }
}



function getIntialData() {
    // remove template html for  file and then replace real doctors
    parentNode.removeChild(drTemplate);

    // now we gor for fetching data and setup real page
    fetch(MY_URL)
    .then((resp) => resp.json())
    .then(
      (input) =>
        {
            data = input
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

                clone.querySelector(".dr-leftSide-status>p:nth-child(2)").innerHTML = element.location
                clone.querySelector(".dr-leftSide-status>p:nth-child(5)").innerHTML = `تجربه کاری ${element.experience_years}سال`
                clone.querySelector(".dr-leftSide-status>p:nth-child(8)").innerHTML = `${element.user_percent}درصد رضایت مشتری`

                clone.querySelector(".dr-leftSide-firstVisitTime").innerHTML = element.first_empty_date
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

function makeDr(element){
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

    clone.querySelector(".dr-leftSide-status>p:nth-child(2)").innerHTML = element.location
    clone.querySelector(".dr-leftSide-status>p:nth-child(5)").innerHTML = `تجربه کاری ${element.experience_years}سال`
    clone.querySelector(".dr-leftSide-status>p:nth-child(8)").innerHTML = `${element.user_percent}درصد رضایت مشتری`

    clone.querySelector(".dr-leftSide-firstVisitTime").innerHTML = element.first_empty_date
    parentNode.appendChild(clone)
}