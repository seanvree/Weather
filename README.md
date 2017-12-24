# Weather
Weather webapp written in HTML/JS. Minimal, self-hosted, and no config required. 

**DEMO**:  https://seanvree.github.io/Weather/

# Features:

- Self-hosted, HTML-pure, minimal.
- Mobile ready
- Weather data auto generated via Geolocation.
- Weather API provided via OpenWeatherMap.
- Animated icons.
- Click-to-convert Celsius/Fahrenheit.
- 5-day forecast data (Click on right icon).
- See this integrated into a dope custom home/start page here: https://github.com/seanvree/homepage

## Screenshot :

<img src="https://i.imgur.com/7nrwwnx.png[/img]">

## Animated Icons :

<img src="https://i.imgur.com/0iamcsT.gif[/img]">

## Notes:

 - Acquire your FREE API key and replace the default key in **/main.js : LINE 11**
 https://home.openweathermap.org/users/sign_up
 
- Weather auto refresh default setting is set at **30** seconds (2 calls per minute), or 30000(ms). Max is 60 API calls per 1 minute.  Change in **/main.js : LINE 264:**

```
var t = window.setInterval(searchByLocation, 30000);
```
 
- Change the default temp unit from F to C by changing the following two items:

**/index.html: LINE 50:**

```
<div id="unit" class="unit">&degC</div>
```

**/main.js: LINE 9:**

```
var unit = 'metric';
```
 

## About Me:
- [seanvree](https://github.com/seanvree) (Windows Wizard)

- I usually hang out here [![Discord](https://img.shields.io/discord/102860784329052160.svg)](https://discord.gg/j2XGCtH)
- Buy me a beer [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/seanvree)

## Credits: 

- [causefx](https://github.com/causefx)
- [jonfinley](https://github.com/jonfinley)
- [wjbeckett](https://github.com/wjbeckett)
