const weatherForm = document.querySelector("form")
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const background = document.getElementById("main-content")
    background.style.backgrondImage=null;


    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ' '
    fetch('/weather?address=' + location).then((response) =>{
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error
            }
            else {
                messageOne.innerHTML = '<strong>' + data.location + '</strong>'
                messageTwo.textContent = data.forecast.daily.data[0].summary + ' It is currently ' + data.forecast.currently.temperature + ' degress out. There is a ' + data.forecast.currently.precipProbability + '% chance of rain.'
                loadWeek(data)
                loadImage(data)
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
    var today = d.getDay() //GETS THE DAY OF THE WEEK IT IS
    console.log(today)
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


const loadImage = function(data){
    const icons = ['clear-day', 'clear-night', 'rain', 'snow', 'sleet', 'wind', 'fog', 'cloudy', 'partly-cloudy-day', 'partly-cloudy-night']
    var current_icon = data.forecast.currently.icon
    console.log(current_icon)

    var counter = 0;
    for (let i=0; i<icons.length; i++){
        if(icons[i]==current_icon){
            counter = i;
            break;
        }
    }

    var header = document.getElementById("main-content")
    header.style.backgroundImage="null"

    //THIS IS THE IMAGE FOR FOG/CLOUDY/PARTLY-CLOUDY-DAY
    
    if (counter==1) {
        const art_desc=document.getElementById("message-art")
        art_desc.innerHTML=""
        header.style.color="white"
        header.style.backgroundImage="url('./img/Stary_Night.png')"
        header.style.backgroundAttachment="absolute" 
        header.style.backgroundSize= "cover";
        header.style.backgroundPosition= "center";
        const breaker = document.createElement("br")
        header.appendChild(breaker)
        header.appendChild(breaker)
        art_desc.style.paddingLeft="10vw"
        art_desc.style.maxWidth="80vw"
        art_desc.innerHTML = "<strong>The Stary Night</strong> <br> The Starry Night is an oil on canvas by the Dutch post-impressionist painter Vincent van Gogh. Painted in June 1889, it describes the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an ideal village. Regarded as among Van Gogh's finest works, The Starry Night is one of the most recognized paintings in the history of Western culture."
        header.appendChild(art_desc)
    }
    else if (counter==2){
        const art_desc=document.getElementById("message-art")
        art_desc.innerHTML=""
        header.style.color="white"
        header.style.backgroundImage="url('./img/rainy_img.png')"
        header.style.backgroundAttachment="absolute" 
        header.style.backgroundSize= "cover";
        header.style.backgroundPosition= "center";
        const breaker = document.createElement("br")
        header.appendChild(breaker)
        header.appendChild(breaker)
        art_desc.style.paddingLeft="10vw"
        art_desc.style.maxWidth="80vw"
        art_desc.innerHTML = "<strong>Paris Street; Rainy Day</strong> <br> Paris Street; Rainy Day is a large 1877 oil painting by the French artist Gustave Caillebotte, and is his best known work. It shows a number of individuals walking through the Place de Dublin, then known as the Carrefour de Moscou, at an intersection to the east of the Gare Saint-Lazare in north Paris."
        header.appendChild(art_desc)
    }

    else if (counter==3 | counter==4){
        const art_desc=document.getElementById("message-art")
        art_desc.innerHTML=""
        header.style.color="black"
        header.style.backgroundImage="url('./img/Night_Snow.png')"
        header.style.backgroundAttachment="absolute" 
        header.style.backgroundSize= "cover";
        header.style.backgroundPosition= "center";
        const breaker = document.createElement("br")
        header.appendChild(breaker)
        header.appendChild(breaker)
        art_desc.style.paddingLeft="10vw"
        art_desc.style.maxWidth="80vw"
        art_desc.innerHTML = "<strong>Kanbara-juku: Evening Snow at Kanbara</strong> <br> The classic ukiyo-e print by Andō Hiroshige (Hōeidō edition) from 1831–1834, depicts a mountain village at nightfall, through which three people are struggling under deep snow. It is a rather strange composition, as Kanbara is located in a very temperate area warmed by the Kuroshio current offshore, and even a light snowfall is extremely rare."
        header.appendChild(art_desc)
    }

    else if (counter==0){
        const art_desc=document.getElementById("message-art")
        art_desc.innerHTML=""
        header.style.color="white"
        header.style.backgroundImage="url('./img/clear_day.png')"
        header.style.backgroundAttachment="absolute" 
        header.style.backgroundSize= "cover";
        header.style.backgroundPosition= "center";
        const breaker = document.createElement("br")
        header.appendChild(breaker)
        header.appendChild(breaker)
        art_desc.style.paddingLeft="10vw"
        art_desc.style.maxWidth="80vw"
        art_desc.innerHTML = "<strong>A Bigger Splash</strong> <br>A Bigger Splash is a large pop art painting by British artist David Hockney in 1967. It depicts a swimming pool beside a modern house, disturbed by a large splash of water created by an unseen figure who has apparently just jumped in from a diving board."
        header.appendChild(art_desc)
    }

    else if (counter==5){
        const art_desc=document.getElementById("message-art")
        art_desc.innerHTML=""
        header.style.color="black"
        header.style.backgroundImage="url('./img/wind.png')"
        header.style.backgroundAttachment="absolute" 
        header.style.backgroundSize= "cover";
        header.style.backgroundPosition= "center";
        const breaker = document.createElement("br")
        header.appendChild(breaker)
        header.appendChild(breaker)
        art_desc.style.paddingLeft="10vw"
        art_desc.style.maxWidth="80vw"
        art_desc.innerHTML = "<strong>Wind from the Sea</strong> <br>Wind from the Sea is a 1947 painting by the American artist Andrew Wyeth. It depicts an inside view of a seldom opened attic window as the wind blows the thin and tattered curtains into the room. "
        header.appendChild(art_desc)
    }

    else if (counter==9){
        const art_desc=document.getElementById("message-art")
        art_desc.innerHTML=""
        header.style.color="white"
        header.style.backgroundImage="url('./img/cloudy_night.png')"
        header.style.backgroundAttachment="absolute"  
        header.style.backgroundSize= "cover";
        header.style.backgroundPosition= "center";
        const breaker = document.createElement("br")
        header.appendChild(breaker)
        header.appendChild(breaker)
        art_desc.style.paddingLeft="10vw"
        art_desc.style.maxWidth="80vw"
        art_desc.innerHTML = "<strong>Evolve DeEvolve</strong> <br>Frank Shepard Fairey is an American contemporary street artist, graphic designer, activist, and illustrator who emerged from the skateboarding scene. Produced as part of the series which celebrates Earth day, the print attempts to bring awareness of ecological issues which are taking over the planet on a global scale."
        header.appendChild(art_desc)
    }

    else {
        const art_desc=document.getElementById("message-art")
        art_desc.innerHTML=""
        header.style.color="white"
        header.style.backgroundImage="url('./img/Wanderer.png')"
        header.style.backgroundAttachment="absolute" 
        header.style.backgroundSize= "cover";
        header.style.backgroundPosition= "center";
        const breaker = document.createElement("br")
        header.appendChild(breaker)
        header.appendChild(breaker)
        art_desc.style.paddingLeft="10vw"
        art_desc.style.maxWidth="80vw"
        art_desc.innerHTML = "<strong>Wanderer Above the Sea of Fog</strong> <br>Also known as Wanderer above the Mist or Mountaineer in a Misty Landscape, is an oil painting c. 1818 by the German Romantic artist Caspar David Friedrich. It has been considered one of the masterpieces of Romanticism and one of its most representative works."
        header.appendChild(art_desc)
    }




}