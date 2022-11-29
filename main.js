const date = document.getElementById('date-time')
 let currentUnit = ''
 let hourlyOrWeekly = 'c'
 let currentCity = 'week'

const getDateTime = () =>{
    let date = new Date()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let days = ['Monday', 'Teusday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] 
    let dayString = days[date.getDay()-1]
console.log(dayString)
    hour =  hour % 12
    console.log(hour)
    if(hour < 10){
        hour = `0${hour}`
    }
    if (minute < 10){
        minute = `0${minute}`
    }
    return `${dayString} ${hour}:${minute}`
}

date.innerText = getDateTime()

//getting public Ip

function getPublicIP (){
    fetch('https://geolocation-db.com/json/', {method:'GET'}).then((res)=> res.json()).then((data)=> {
        currentCity = data.currentCity;
        getWeatherData(data.city, currentUnit, hourlyOrWeekly)
    })
}
getPublicIP()

function getWeatherData(city, unit, hourlyorweekly){
 let apikey = '52W7CA9XTP3KSYNH2VYQKMGM7'
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apikey}&contentType=json`).then((res)=> res.json()).then((data)=> console.log(data))
}

getWeatherData()