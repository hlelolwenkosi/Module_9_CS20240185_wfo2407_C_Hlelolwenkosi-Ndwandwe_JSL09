// Fetch a random nature photo from Unsplash and set it as the background
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => {
        // Check if the response is successful
        if (!res.ok) {
            throw Error("Unable to fetch Unsplash image")
        }
        return res.json()
    })
    .then(data => {
        // Set the fetched image as the background
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        // Display the author of the image
        document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        console.error(err)
        // If there is an error, use a default image and author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`
        document.getElementById("author").textContent = `By: Dodi Achmad`
    })

// Fetch Dogecoin data from CoinGecko API and display the price information
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        // Check if the response is successful
        if (!res.ok) {
            throw Error("Something went wrong with the Dogecoin API")
        }
        return res.json()
    })
    .then(data => {
        // Display the Dogecoin image and name
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} alt="Dogecoin logo" />
            <span>${data.name}</span>
        `
        // Display the current price, high, and low for the last 24 hours in ZAR (South African Rand)
        document.getElementById("crypto").innerHTML += `
            <p>🎯: R${data.market_data.current_price.zar}</p>
            <p>👆: R${data.market_data.high_24h.zar}</p>
            <p>👇: R${data.market_data.low_24h.zar}</p>
        `
    })
    .catch(err => {
        // Log any errors in the console
        console.error(err)
    })

// Function to get and display the current time, updated every second
function getCurrentTime() {
    const date = new Date()
    // Format the time in short format (e.g., 12:30 PM) and display it
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" })
}

// Update the time every second
setInterval(getCurrentTime, 1000)

// Fetch weather data based on the user's current location
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            // Check if the response is successful
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            // Fetch and display weather icon, temperature in Celsius, and city name
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} alt="Weather icon" />
                <p class="weather-temp">${Math.round(data.main.temp)}ºC</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => {
            // Log any errors in the console
            console.error(err)
        })
})
