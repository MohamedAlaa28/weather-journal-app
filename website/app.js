/* Global Variables */
const baseURL = 'api.openweathermap.org/data/2.5/weather?'
const apiKey = '21bfe40c4ffed69085717f7f2cb62ded&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();//Because getmonth() start from 0 have to use d.getMonth() + 1

document.getElementById("generate").addEventListener("click", performAction); // put eventlistener on the button

async function performAction (){
  const zipCode = document.getElementById('zip').value; 
  const text = document.getElementById('feelings').value;
  const data =  await getWeather(baseURL,zipCode,apiKey) //get the data about temperature from openweather
  postData("/", {date : newDate, temperature : data.main.temp , feeling : text} )
  //post data that we get in home
  updateUI()
}      
   
const getWeather = async (baseURL,zipCode,apiKey)=>{
  const res = await fetch(`http://${baseURL}zip=${zipCode}&appid=${apiKey}`)
  try {
    const data = await res.json();
    return (data);
  }  catch(error) {
    console.log("error", error);
  }
}

const postData = async ( url = "/", data = {})=>{
    const response = await fetch(url, {
    method: "POST", 
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
    },     
    body: JSON.stringify(data),
  });
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
      console.log("error", error);
    }
}

const updateUI = async () => {
  const request = await fetch("/getWeather");
  try{
    const data = await request.json()
    console.log(data);
    // set data in the html to display it ui
      document.getElementById("date").innerHTML =  `Date : ${data.date}`;
      document.getElementById("content").innerHTML =  `Your impression : ${data.fell}`;
      document.getElementById("temp").innerHTML = `Temperature : ${data.temp} °C`;
  }catch(error){
      console.log("error", error);
  }
}