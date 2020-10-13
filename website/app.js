/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = '&appid=87d66b5a74fe3f0994a7f1a2688610af';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click',getInitialData)

function getInitialData(e) {
    e.preventDefault();
    let zipCode = document.getElementById('zip').value;
    let UserContent = document.getElementById('feelings').value;
    getInitWeather(baseURL, zipCode, apiKey)
        .then(function (UWData) {
            // add data to POST request
             newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
            postData('/add', { date: newDate, temp: UWData['main'].temp, UserContent })
        }).then(function (newData) {
        // call updateUI to update browser content
        updateUserUI()
    });
}


/* Function to GET Web API Data from open wather*/
const getInitWeather = async (baseURL, zipCode, apiKey) => {
    // res equals to the result of fetch function
    const res = await fetch(baseURL + zipCode + apiKey);
    try {
        return await res.json();
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.UserContent
        })
    })

    try {
        return  await req.json();
    }
    catch (error) {
        console.log(error);
    }
};

const updateUserUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json()
        // show icons on the page
        // icons.forEach(icon => icon.style.opacity = '1');
        // update new entry values
        console.log(allData)
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData['user-response'];
    }
    catch (error) {
        console.log("error", error);
    }
};
