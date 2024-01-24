let allData // بيانات الريكويست كلها
let smallData // البيانات التفصيلية بتاعتي اللي هحتاجها 
let headcard = document.querySelector('.upper')
let myDate = new Date
let dNum = myDate.getDay()
let mNum = myDate.getMonth()
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",]
let searchInput = document.querySelector('.mySearch')
searchInput.addEventListener('keyup', searching)



// ---------------------   starting values   -------------------------
async function getData() {
    allData = await fetch(`https://api.weatherapi.com/v1/current.json?key=201d020e200b484aabe163903241101&q=cairo`)
    smallData = await allData.json()


    headcard.innerHTML = `<p class=" m-0 text-center">${days[dNum]}</p>`;

    document.querySelector('.day1').innerHTML = `
    <p >${smallData.location.name}</p>
    <div class=" heroDiv d-flex justify-content-center align-items-center w-100 ">
        <p class="currentTemp text-center px-3   ">${smallData.current.temp_c}<sup>&#9900;</sup><span>c</span></p>
        <img src="https:${smallData.current.condition.icon}" alt="weather condition" class="" >
    </div>
    <div class="d-flex justify-content-center align-items-center flex-column w-100">
        <p class="px-2 smalldetails fw-bold  "> ${smallData.current.condition.text}</p>
        <p class="px-2 smalldetails"> <i class="fa-solid fa-cloud-showers-heavy"> </i> 18% <i class="myspace"></i> <i class="fa-solid fa-wind" ></i> ${smallData.current.wind_kph} km/h  </p>
    </div>
    <p class="px-2 mx-auto fs-6 fw-light smalldetails">${(smallData.current.last_updated).split(' ')[0]}</p>
    `
    console.log(smallData);
}

async function getForcast() {
    let allForCst = await fetch('https://api.weatherapi.com/v1/forecast.json?key=201d020e200b484aabe163903241101&q=cairo&days=3')
    let myForcast = await allForCst.json()
    let nextDay = myForcast.forecast.forecastday[1]
    let afterNext = myForcast.forecast.forecastday[2]

    document.querySelector('.day2-Date').innerHTML = `
    <p class=" m-0 text-center">${days[dNum + 1]}</p>
    `
    document.querySelector('.day2').innerHTML = `
    <img src="https:${nextDay.day.condition.icon}" alt="" class="myiconnext">
    <p class="nextTemp text-center">${nextDay.day.avgtemp_c}<sup>&#9900;</sup><span>c</span></p>
    <p class="smalldetails ">${nextDay.date}</p>
    `
    document.querySelector('.day3-Date').innerHTML = `
    <p class=" m-0 text-center">${days[dNum + 2]}</p>
    `
    document.querySelector('.day3').innerHTML = `
    <img src="https:${afterNext.day.condition.icon}" alt="" class="myiconnext">
    <p class="nextTemp text-center">${afterNext.day.avgtemp_c}<sup>&#9900;</sup><span>c</span></p>
    <p class="smalldetails">${afterNext.date}</p>
    `
}

getData()
getForcast()
// ---------------------   end starting values   -------------------------



//============================  start searching   =================================

async function searching() {
    allData = await fetch(`https://api.weatherapi.com/v1/current.json?key=201d020e200b484aabe163903241101&q=${this.value}`)
    if (allData.ok == true) {
        smallData = await allData.json()

        document.querySelector('.day1').innerHTML = `
        <p >${smallData.location.name}</p>
        <div class=" heroDiv d-flex justify-content-center align-items-center w-100 ">
            <p class="currentTemp text-center px-3   ">${smallData.current.temp_c}<sup>&#9900;</sup><span>c</span></p>
            <img src="https:${smallData.current.condition.icon}" alt="weather condition" class="" >
        </div>
        <div class="d-flex justify-content-center align-items-center flex-column w-100">
            <p class="px-2 smalldetails fw-bold  "> ${smallData.current.condition.text}</p>
            <p class="px-2 smalldetails"> <i class="fa-solid fa-cloud-showers-heavy"> </i> 18% <i class="myspace"></i> <i class="fa-solid fa-wind" ></i> ${smallData.current.wind_kph} km/h  </p>
        </div>
        <p class="px-2 mx-auto fs-6 fw-light smalldetails">${(smallData.current.last_updated).split(' ')[0]}</p>
        `

        let allForCst = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=201d020e200b484aabe163903241101&q=${this.value}&days=3`)
        let myForcast = await allForCst.json()
        let nextDay = myForcast.forecast.forecastday[1]
        let afterNext = myForcast.forecast.forecastday[2]


        document.querySelector('.day2').innerHTML = `
            <img src="https:${nextDay.day.condition.icon}" alt="" class="myiconnext">
            <p class="nextTemp text-center">${nextDay.day.avgtemp_c}<sup>&#9900;</sup><span>c</span></p>
            <p class="smalldetails ">${nextDay.date}</p>
            `

        document.querySelector('.day3').innerHTML = `
        <img src="https:${afterNext.day.condition.icon}" alt="" class="myiconnext">
        <p class="nextTemp text-center">${afterNext.day.avgtemp_c}<sup>&#9900;</sup><span>c</span></p>
        <p class="smalldetails ">${afterNext.date}</p>
            `
    }
}

//============================  end searching   =================================

