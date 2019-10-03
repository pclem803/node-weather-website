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
    var week = document.getElementById("next-week")
    var today_table = document.getElementById("today")
    if (today_table){
        clearweather(today_table)
    }
    var week_table = document.getElementById("week-table")
    const days = ["Sunday", "Monday", 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
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
        var hourweather = document.createTextNode(data.forecast.hourly.data[counter].temperature + " ")
        hour.appendChild(hourweather)
        today_table.appendChild(hour)
        counter++;
        counter2++;
    }

}


