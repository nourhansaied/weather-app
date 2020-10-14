/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=87d66b5a74fe3f0994a7f1a2688610af&units=imperial';

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
            postData('/add', { date: newDate, temp: UWData['main'].temp, UserContent,extra:UWData })
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
        document.getElementById('no-data').innerHTML = error
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
            content: data.UserContent,
            extraData: data.extra
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
        // update new entry values

        document.getElementById('preview').innerHTML = '';
        let container = document.createElement('div');
        container.classList.add('extra-data');
        let img = document.createElement('img');

        let desc = document.createElement('p');
        let tit = document.createElement('h5');
        desc.innerHTML = allData.extra.weather[0].description;
        tit.innerHTML = allData.extra.weather[0].main;

        img.setAttribute('src',' http://openweathermap.org/img/wn/'+allData.extra.weather[0].icon+'@2x.png')
        container.append(tit)
        container.appendChild(desc)

        document.getElementById('date').innerHTML =  'date: ' + allData.date;
        document.getElementById('preview').appendChild(container)
        document.getElementById('preview').appendChild(img)
        document.getElementById('city').innerHTML =  'City: ' + allData.extra.name;
        document.getElementById('temp').innerHTML = 'Temp: '+ allData.temperature;
        document.getElementById('content').innerHTML = 'Feelings: '+ allData['user-response'];
    }
    catch (error) {
        console.log("error", error);
    }
};
