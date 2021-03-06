console.log("js is loaded")

var listOfDoctors
const MY_URL = "https://intense-ravine-40625.herokuapp.com/doctors"
    // const search_URL = "http://127.0.0.1:8000/polls/user/SearchDoc/name=a/"
const search_URL = "http://127.0.0.1:8000/polls/user/SearchDoc/name="
const specialies = ["اعصاب و روان", "ارتوپد", "جراحی کمر", "غدد"]
const search_string = document.getElementById("search_DR_name");
const search_button = document.getElementById("searchButton");
var drTemplate
var parentNode
var data

main()

function main() {
    // console.log("we are here")
    drTemplate = document.querySelector(".dr")
    parentNode = document.querySelector("#neurologist-section-parent>div")
        // console.log(parentNode)
    getIntialData();
    // در این بخش دکتر ها را دریافت می کنیم

    addEventListenerToSorters();
    addEvents();
}

function addEvents() {
    search_button.addEventListener('click', () => {
        searchFunction(search_string.value)
    });
}

function addEventListenerToSorters() {
    var buttons = document.querySelectorAll(".sorting-choice")
    buttons.forEach(element => {
        if (element.innerHTML === "بیشترین رضایتمندی ") {
            element.addEventListener('click', sortByPercent);
        }
    });
}

function sortById(event) {
    var lastElement = document.getElementsByClassName("sorting-choice-active")[0]
    lastElement.className = "sorting-choice"
        // color of option chang to blue
    event.target.className = "sorting-choice-active"

    //first delete all things
    allDr = document.querySelectorAll(".dr")
    allDr.forEach(element => {
        parentNode.removeChild(element)
    });

    for (var i = 0; i < data.length; i++) {
        makeDr(data[i])
    }

}

function sortByPercent(event) {
    // last button get blue
    // listener of sort by id set in first time that you click on sortBypercent
    var lastElement = document.getElementsByClassName("sorting-choice-active")[0]
    lastElement.className = "sorting-choice"
    lastElement.addEventListener("click", sortById)


    // color of option chang to blue
    event.target.className = "sorting-choice-active"
        //first delete all things
    allDr = document.querySelectorAll(".dr")
    allDr.forEach(element => {
        parentNode.removeChild(element)
    });

    // find Best
    let capturedIndexes = new Array()
    for (var i = 0; i < data.length; i++) {
        let max = 0
        let target = 0
        for (var j = 0; j < data.length; j++) {
            if (data[j].user_percent >= max && !capturedIndexes.includes(j)) {
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
            (input) => {
                data = input
                listOfDoctors = data;
                console.log(data[0])

                data.forEach(element => {
                    var clone = drTemplate.cloneNode(true);
                    clone.querySelector(".dr-rightSide>img").src = element.avatar // image
                    clone.querySelector(".dr-centeral>h1").innerHTML = element.name
                    clone.querySelector(".dr-centeral>h2").innerHTML = element.spec

                    //    stars
                    var stars = clone.querySelectorAll(".dr-centeral-stars>svg")
                    for (var i = 0; i < element.stars; i++) {
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
            }
        )
}

function searchFunction(inputName) { // second function for fetching

    //remove all dr in page
    allDr = document.querySelectorAll(".dr")
    allDr.forEach(element => {
        parentNode.removeChild(element)
    });

    //name specs[true , false ,]
    specsbools = []
    for(var i=0 ; i<4 ;i++){//loop over all spec of doctors and check state of them
        var target_id="checkbox" + i;
        specsbools.push(document.getElementById(target_id).checked)
    }
    console.log(inputName)

    var sendData = {name:inputName , specs:specsbools}
    sendData = JSON.stringify(sendData)
    console.log(sendData)
    makeRequest('POST', "http://127.0.0.1:8000/polls/user/SearchDoc", sendData).then(function(data) {
        console.log(data)
        data = JSON.parse(data)
        listOfDoctors = data["result"]
        console.log(listOfDoctors)
        if (listOfDoctors.length == 1) {
            window.location.href = "./dr-Page/DR.html?phone=" + listOfDoctors[0].phone
        } else {
            listOfDoctors.forEach(element => {
                var clone = drTemplate.cloneNode(true);
                clone.querySelector(".dr-rightSide>img").src = element.avatar // image
                clone.querySelector(".dr-centeral>h1").innerHTML = element.name
                clone.querySelector(".dr-centeral>h2").innerHTML = specialies[parseInt(element.spec)];

                //    stars
                var stars = clone.querySelectorAll(".dr-centeral-stars>svg")
                for (var i = 0; i < element.score; i++) {
                    stars[i].style.fill = "blue";
                }

                // comments number
                clone.querySelector(".dr-centeral-stars>p").innerHTML = `(نظر ${element.scores_count})`

                clone.querySelector(".dr-centeral>p").innerHTML = element.last_Comment

                clone.querySelector(".dr-leftSide-status>p:nth-child(2)").innerHTML = element.address
                clone.querySelector(".dr-leftSide-status>p:nth-child(5)").innerHTML = `تجربه کاری ${element.experience_years}سال`
                clone.querySelector(".dr-leftSide-status>p:nth-child(8)").innerHTML = `${element.score}درصد رضایت مشتری`

                clone.querySelector(".dr-leftSide-firstVisitTime").innerHTML = "شنبه"
                parentNode.appendChild(clone)
            });
        }
    })
}

function makeDr(element) {
    var clone = drTemplate.cloneNode(true);
    clone.querySelector(".dr-rightSide>img").src = element.avatar // image
    clone.querySelector(".dr-centeral>h1").innerHTML = element.name
    clone.querySelector(".dr-centeral>h2").innerHTML = element.spec

    //    stars
    var stars = clone.querySelectorAll(".dr-centeral-stars>svg")
    for (var i = 0; i < element.stars; i++) {
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
            xhr.send(data);
        }
    });
}