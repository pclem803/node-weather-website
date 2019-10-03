const weatherForm = document.querySelector("form")
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()


    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ' '
    fetch('/weather?address=' + location).then((response) =>{
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.daily.data[0].summary + ' It is currently ' + data.forecast.currently.temperature + ' degress out. There is a ' + data.forecast.currently.precipProbability + '% chance of rain.'
                loadWeek(data)
            }
        })
})
})


function clearweather(div){
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
}

function loadWeek(data) {
    var d = new Date
    var current_time = d.getHours()//RETURNS CURRENT HOUR
    var today = d.getDate() //GETS THE DAY OF THE WEEK IT IS
    var month =d.getMonth();
    var today_table = document.getElementById("today")
    if (today_table){
        clearweather(today_table)
    }
    var week_table = document.getElementById("week-table")
    const days = ["Sunday", "Monday", 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const shortdays= ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    var dayheader = document.createElement("h1")
    var dayheadertext = document.createTextNode(days[today] + ", " + months[month] + " " + d.getFullYear())
    dayheader.appendChild(dayheadertext)
    today_table.appendChild(dayheader)

    var counter=0;//COUNTER TO GET THE ARRAY OF DATA FROM API
    var counter2=0;
    for (let i=current_time; i<24; i++ ){
        var hour = document.createElement("p")
        var am_pm = current_time

        //THIS SETS THE AM PM OF THE AM_PM VAR
        if (i==23 && counter==0){
            i=0;
            am_pm = "12:00am"
        }
        else if (i==0){
            am_pm = "12:00am"
        }
        else if (i>11){
            if (i==12){
                am_pm= i + ':00pm'
            }
            else {
                am_pm = (i-12) +':00pm'
            }
        }
        else {
            am_pm = i + ':00am'
        }
        var hourText = document.createTextNode(am_pm + ': ')
        var hourbreak = document.createElement("br")
        hour.appendChild(hourText)
        hour.appendChild(hourbreak)
        var hoursummary = document.createTextNode(data.forecast.hourly.data[counter].summary)
        hour.appendChild(hoursummary)
        hour.appendChild(hourbreak)
        var hourweather = document.createTextNode(Math.round(data.forecast.hourly.data[counter].temperature) + '°F ')
        hour.appendChild(hourweather)
        today_table.appendChild(hour)
        counter++;
        counter2++;
    }


    var weekheader = document.createElement("h1")
    var weekheadertext = document.createTextNode("This Week:")
    weekheader.appendChild(weekheadertext)
    today_table.appendChild(weekheader)
    counter3=1;//COUNTER FOR DAYS
    for (let j=1; j<7; j++){
        var week_day = document.createElement("p")
        if (today+j+1 > 6){
            today = today-7
        }
        var week_daytext = document.createTextNode(shortdays[today+j+1] +': ')
        week_day.appendChild(week_daytext)
        var daybreak1 = document.createElement("br")
        week_day.appendChild(daybreak1)
        var daysummary = document.createTextNode(data.forecast.daily.data[j].summary)
        week_day.appendChild(daysummary)
        var daybreak2 = document.createElement("br")
        week_day.appendChild(daybreak2)
        var daytemperature = document.createTextNode(Math.round(data.forecast.daily.data[j].temperatureLow) + '°'+ " thorugh " + Math.round(data.forecast.daily.data[j].temperatureHigh) + '°F')
        week_day.appendChild(daytemperature)
        today_table.appendChild(week_day);
    }

    
}


