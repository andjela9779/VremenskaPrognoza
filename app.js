window.addEventListener('load', () => {
    let long; // longituda
    let lat;  // latituda
    // iz htmla
    let isDayDescription = document.querySelector('.isDay-description');
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let cityName = document.querySelector('.city');
    let icon = document.querySelector('.weather-icon');
    let canvas = document.querySelector('.weather-canvas');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature-span');

    if(navigator.geolocation){  // prvo cemo morat iz pop up-a dozvolit geolocation, ako postoji i ako korisnik dozvoli pristup
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position); // ispise long i lat lokacije
            long = position.coords.longitude;  // uzeli smo podatke i spremili ih
            lat = position.coords.latitude;

            // sad nam treba access za vrijeme 

            
            // nema current temp
            const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=temperature_2m,is_day,rain,showers,snowfall`; // moramo zamijeniti lat i long iz linka sa nasom detektiranom lokacijom, $...
            //const apiKey = 'cc291a0c2fa74fd09c6153006231505';
            //const api = `http://api.weatherapi.com/v1/current.json?q&lat=${lat}&lon=${long}&key=${apiKey}`;

            // povlacimo informacije iz api i onda s tim podacima nesto uradi
        fetch(api).then(response => {
            // response su nam podaci koje dobijemo iz api i onda ih zelimo konvertirati u json
            return response.json();

        })
        .then(data => {
            console.log(data);
            const {temperature, is_day,weathercode} = data.current_weather;
            
            // Postavljanje DOM elemenata iz API

            temperatureDegree.textContent = temperature;
            if(is_day == 1) {
            isDayDescription.textContent = "It's daytime";
            } else {
                isDayDescription.textContent = "It's nighttime";
            }
            const vremenska_zona= data.timezone;
            locationTimezone.textContent = vremenska_zona;
            let x;
            x = prompt("Unesite naziv mjesta u kojem se nalazite");
            cityName.textContent = x;

            

            //ikona 
            
            if(weathercode==0){
                icon.textContent="CLEAR";
                document.getElementById("skycon").src = "CLEAR.png";

            } else if (weathercode >=1 && weathercode <= 3){
                icon.textContent = "PARTLY CLOUDY";
                //canvas.className = icon;
                document.getElementById("skycon").src = "PARTLY_CLOUDY.png";



            } else if (weathercode >= 45 && weathercode <= 48){
                icon.textContent = "FOG";
                document.getElementById("skycon").src = "FOG.png";

                canvas.className = icon;
            } else if (weathercode >=51 && weathercode <= 67 ){
                icon.textContent ="RAIN";
                document.getElementById("skycon").src = "HEAVY_RAIN.png";

                canvas.className = icon;
            } else if (weathercode >= 71 && weathercode <= 77){
                icon.textContent ="SNOW";
                document.getElementById("skycon").src = "SNOW.png";

                canvas.className = icon;
            } else if (weathercode >= 80 && weathercode <= 85){
                icon.textContent ="LIGHT RAIN";
                document.getElementById("skycon").src = "LIGHT_RAIN.png";


                
            } else {
                icon.textContent ="Icon not available"
            };


            // PROMJENA C U F I OBRNUTO
            temperatureSection.addEventListener("click", () => {
                if(temperatureSpan.textContent === "C")   {
                    temperatureSpan.textContent ="F"
                    temperatureDegree.textContent = (temperature * 1.8) + 32;
                }else {
                    temperatureSpan.textContent = "C"
                    temperatureDegree.textContent = temperature;
                }
            });



            


            


            



            
        })
        });

         /*povlacimo informacije iz api i onda s tim podacima nesto uradi
        fetch(api).then(response => {
            // response su nam podaci koje dobijemo iz api i onda ih zelimo konvertirati u json
            return response.json();

        })
        .then(data => {
            console.log(data);
        })
        KOPIRANO GORE JER OVDJE NE RADI VAN IF-A, api nije available izvan
        */

    }
    
    else {
        h1.textContent = "The weathercast is not working. Maybe you haven't allowed access to your location, or your browser doesn't support this function. "
    }

    
    

}); // nakon sto nam se ucita stranica mozemo dobiti lokaciju/koordinate, pokrene nam se ova funkcija