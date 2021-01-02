API = "https://intense-ravine-40625.herokuapp.com/doctors/"

function fetchDrPAgeData(ID) {
    URL = API + ID
    fetch(URL)
        .then((resp) => resp.json())
        .then(
            (input) => {
                data = input
                window.alert(data["name"])
            })

}
fetchDrPAgeData("1");