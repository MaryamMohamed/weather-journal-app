/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=1fa9860c71c3c66313269250521a9a41';
const fomeInput = document.getElementById('fomeInput');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(event){
    event.preventDefault();

    const newZip =  document.getElementById('zip').value;
    const newBody = document.getElementById('feelings').value;

    getWeather(baseURL,newZip, apiKey)
    .then(function(data) {
      postData('/add', { date: newDate, temp: data.main.temp, content: content });
    })
    .then(function() {
      updateUI()
    })
    
    fomeInput.reset();
}

// Pass the API Key variable as a parameter to fetch() . 
  const getWeather = async (baseURL, newZip, apiKey)=>{
    const res = await fetch(baseURL+newZip+apiKey)
    console.log(res);
    try {
      const data = await res.json();
      console.log(data);
      return data;
    }  catch(error) {
      console.log("error", error);
    }
  }

// POST client function
const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },

    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    }), 
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
}

// Dynamic UI
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()

    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;
  }
  catch (error) {
    console.log("error", error);
  }
};