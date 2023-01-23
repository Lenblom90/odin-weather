const getWeather = async (location) => {
    const key = '751d0e966d120377d48b307961cd1af7';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;
    try {
        const response = await fetch(url, {mode: "cors"});
        const result = await response.json();
        if(result.cod === 200){
            console.log(result);
            const data = processResult(result);           
            return data;    
        }
    } catch (err) {
        console.log(err);
    }
}

const processResult = (result) => {
    let data = {};
    data.name = result.name;
    data.weather = result.weather[0].description;
    data.tempC = Math.round(result.main.temp - 273.15);
    data.humidity = result.main.humidity;

    return data;
}

const createForm = () => {
    const content = document.getElementById('content');

    const form = document.createElement('form');
    form.id = 'weatherForm';
    const label = document.createElement('label');
    label.textContent = "Location"
    const input = document.createElement('input');
    input.placeholder = "location";
    const button = document.createElement('button');
    button.textContent = "Search";
    button.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target.form[0].value);
        getWeather(e.target.form[0].value).then((data) => {
            displayWeather(data);
        })
    })

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);
    content.appendChild(form);
}

const displayWeather = (data) => {
    const content = document.getElementById('content');

    const div = document.createElement('div');
    div.classList.add('weather-data');
    content.appendChild(div);
    const span = document.createElement('span');
    span.textContent = data.name + " " + data.weather + ", temperature(C): " + data.tempC + ", humidity: " + data.humidity + "%.";
    div.appendChild(span);
    console.log(data);
} 

createForm();
//data = getWeather("london");
//displayWeather(data);

