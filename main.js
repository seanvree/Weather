/* 
Weather condition API information: https://openweathermap.org/weather-conditions 
*/


$(function () {
    var $city = $('#city');

    var unit = 'imperial';
    var lastData = {};
    var weatherApiKey = 'd2ae6d25c09549f38d8feed1d116c580';

    var weatherApi = 'https://api.openweathermap.org/data/2.5/weather?callback=?';
    var startPos;
    // seattle
    var lat = 47.6097;
    var lon = -122.3331;
    var geoOptions = {
        maximumAge: 5 * 60 * 1000,
        timeout: 10 * 1000
    };

    var printResults = function (data) {
        if (data) {
            lastData = data;
        }
        $("#city").text(lastData.name);
        $("#icon").text(lastData.weather.icon);
        $("#temp").text(lastData.main.temp.toFixed(0));

        console.log(lastData.name);
        console.log(lastData.id);

        var cityid = lastData.id;
        $("#weatherlink").attr('href', function (index, attr) {
            return ("https://openweathermap.org/city/") + cityid;
        });

        $(".icon").addClass('hidden');

        $(function () {
            var temp = parseInt($('#temp').text().trim());
            var color = 'red';

            if (!isNaN(temp)) {

                if (temp >= 100) {
                    color = '#c10001';
                };

                if (temp >= 90 && temp <= 99) {
                    color = '#cc0001';
                };

                if (temp >= 80 && temp <= 89) {
                    color = '#fe0002';
                };

                if (temp >= 70 && temp <= 79) {
                    color = '#E83C0C';
                };

                if (temp >= 60 && temp <= 69) {
                    color = '#ffc100';
                };

                if (temp >= 50 && temp <= 59) {
                    color = '#92d14f';
                };

                if (temp >= 40 && temp <= 49) {
                    color = '#00af50';
                };

                if (temp >= 30 && temp <= 39) {
                    color = '#0199fe';
                };

                if (temp >= 20 && temp <= 29) {
                    color = '#3432ff';
                };

                if (temp >= 10 && temp <= 19) {
                    color = '#7030a2';
                };

                if (temp >= 0 && temp <= 9) {
                    color = '#980299';
                };

                if (temp <= 0) {
                    color = '#cc0199';
                };

                $('#temp').css('color', color);
                $('#unit').css('color', color);
            }
        });



        var weatherCode = parseInt(lastData.weather[0].id, 10);
        var icon = lastData.weather[0].icon;
        var description = lastData.weather[0].description;
        var temp = parseInt(lastData.main.temp, 10);

        console.log(weatherCode);
        console.log(description);
        console.log(temp);
        console.log(icon);

        if (icon == "01d") {
            $(".sunny").removeClass('hidden');

        } else if (icon == "01n") {
            $(".clear-night").removeClass('hidden');

        } else if (icon == "02d") {
            $(".sunny").removeClass('hidden');

        } else if (icon == "02n") {
            $(".clear-night").removeClass('hidden');

        } else if (icon == "03d") {
            $(".sunny-cloudy").removeClass('hidden');

        } else if (icon == "03n") {
            $(".moon-cloudy").removeClass('hidden');

        } else if (icon == "04d") {
            $(".overcast").removeClass('hidden');

        } else if (icon == "04n") {
            $(".moon-overcast").removeClass('hidden');

        } else if (icon == "09d") {
            $(".drizzle").removeClass('hidden');

        } else if (icon == "09n") {
            $(".moon-drizzle").removeClass('hidden');

        } else if (icon == "10d") {
            $(".rainy").removeClass('hidden');

        } else if (icon == "10n") {
            $(".moon-rainy").removeClass('hidden');

        } else if (icon == "11d") {
            $(".thunderstorm").removeClass('hidden');

        } else if (icon == "11n") {
            $(".moon-thunderstorm").removeClass('hidden');

        } else if (icon == "13d") {
            $(".sun-snow").removeClass('hidden');

        } else if (icon == "13n") {
            $(".moon-snow").removeClass('hidden');

        } else if (icon == "50d") {
            $(".foggy").removeClass('hidden');

        } else if (icon == "50n") {
            $(".foggy-night").removeClass('hidden');

        } else if (weatherCode == 905 || 954 || 956) {
            $(".windy").removeClass('hidden');

        } else {
            $(".unknown").removeClass('hidden');
        }
    };

    var getWeather = function (lat, lon, q) {
        var city = $city.text();
        $city.text(city + ' (Loading...)');
        var weatherData = {
            appid: weatherApiKey,
            units: unit
        };
        if (q) {
            weatherData.q = q;
        } else {
            weatherData.lat = lat;
            weatherData.lon = lon;
        }
        $.getJSON(weatherApi, weatherData, printResults);
    };

    var geoSuccess = function (position) {
        startPos = position;
        lat = startPos.coords.latitude;
        lon = startPos.coords.longitude;
        getWeather(lat, lon);
    };

    var geoError = function (error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out

        // ignore it and use the default lat and lon

        getWeather(lat, lon);
    };

    var searchByLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
        } else {
            getWeather(lat, lon);
        }
    };

    var searchByCity = function (event) {
        var esc = event.which == 27;
        var enter = event.which == 13;
        var ele = event.target;

        if (esc) {
            resetCity();
        } else if (enter) {
            event.preventDefault();
            var city = $city.text();
            getWeather(null, null, city);
            ele.blur();
        }
    };

    var resetCity = function () {
        $city.text(lastData.name).blur();
    };

    var changeUnit = function () {
        var $temp = $("#temp");
        var $unit = $('#unit');
        var currentTemp = parseFloat($temp.text());
        var newTemp = 0;
        //°C  x  9/5 + 32 = °F
        // (°F  -  32)  x  5/9 = °C
        if (unit === 'imperial') {
            newTemp = (currentTemp - 32) * 5 / 9;
            unit = 'metric';
            $unit.text('°C');
        } else {
            newTemp = currentTemp * 9 / 5 + 32;
            unit = 'imperial';
            $unit.text('°F');
        }
        $temp.text(newTemp.toFixed(0));
    };

    $("#city").keydown(searchByCity);
    $("#unit").click(changeUnit);
    $("#temp").click(changeUnit);
    searchByLocation();

    // How frequent API call is made for weather update//
    //Max is 60 calls per 1 minute. Default is 30 seconds (2 calls per minute), or 30000(ms) //

    var t = window.setInterval(searchByLocation, 30000);

    function refreshDiv() {
        $.ajaxSetup({
            cache: false
        });
    };

});
