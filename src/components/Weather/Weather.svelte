<script>
    import {weather, geolocation} from "../../store/store";
    import {createEventDispatcher} from 'svelte';

    const dispatcher = createEventDispatcher();
    const refreshWeather = () => {
        dispatcher('weatherRefresh', true);
    }

    const weatherStatuses = [
        {
            icon: 'fas fa-cloud-rain',
            id: 'rain',
            color: 'cadetblue'
        },
        {
            icon: 'fas fa-cloud-moon',
            id: 'cloudy-night',
            color: 'darkslategrey'
        },
        {
            icon: 'fas fa-cloud-sun',
            id: 'cloudy-day',
            color: 'cadetblue'
        },
        {
            icon: 'fas fa-cloud-sun-rain',
            id: 'cloudy-day-rain',
            color: 'cadetblue'
        },
        {
            icon: 'fas fa-sun',
            id: 'sunny',
            color: 'yellow'
        }
    ];

    const getWeatherIcon = (status) => {
        const elem = weatherStatuses.find(i => i.id === status);
        return elem.icon;
    }
</script>

<style>
    .weather__wrapper {
        display: block;
        position: relative;
        margin: 0 auto;
        width: 600px;
        height: 350px;
    }

    .weather__wrapper-background {
        position: absolute;
        display: block;
        width: 600px;
        height: 350px;
        z-index: -10;
        background-image: url("/assets/img/sara-the-freak-A4UojtraSrw-unsplash.jpg");
        background-size: cover;
        filter: blur(4px);
        -webkit-filter: blur(4px);
    }

    .weather__wrapper-body {
        display: flex;
        position: absolute;
        z-index: 100;
        width: 600px;
        height: 200px;
        padding: 32px 16px;
        box-sizing: border-box;
    }

    .weather__wrapper__options-btn {
        position: absolute;
        right: 0;
        top: 0;
    }

    .weather__wrapper__options-btn button {
        background: none;
        border: none;
        color: white;
        padding: 8px;
    }

    .weather__wrapper__settings {
        display: block;
        position: absolute;
        z-index: 0;
        opacity: 0;
    }

    .weather__wrapper__weather {
        display: flex;
        width: 100%;
        padding: 0 42px 0 32px;
    }

    .weather__wrapper__weather-column {
        display: flex;
        flex: 1;
        justify-content: right;
        flex-direction: column;
        color: white;
        text-shadow: 0 0 2px #333;
    }

    .weather__wrapper__weather-column:first-child {
        justify-content: left;
    }

    .weather__wrapper__weather-column span {
        flex: 1;
    }

    .weather__wrapper__weather-title {
        font-size: 32px;
        max-height: 38px;
        text-align: left;
    }

    .weather__wrapper__weather-date {
        color: #333;
        font-size: 16px;
        text-shadow: 0 0 2px #FFF;
        max-height: 22px;
        text-align: left;
    }

    .weather__wrapper__weather-details {
        text-align: left;
        max-height: 50px;
        text-transform: capitalize;
    }

    .weather__wrapper__weather-details span {
        display: block;
        width: 100%;
        font-size: 50px;
        text-align: left;
    }

    .weather__wrapper__weather-temperature {
        font-size: 92px;
        font-weight: lighter;
        text-align: right;
    }

    .weather__wrapper__weather-temperature::after {
        content: "°";
        position: absolute;
    }

    .weather__wrapper__weather-min-max {
        font-size: 36px;
        text-align: right;
        font-weight: lighter;
    }

    .weather__wrapper__forecast {
        display: flex;
        width: 100%;
        position: absolute;
        padding: 0 42px 0 32px;
        min-height: 150px;
        bottom: 0;
        z-index: 120;
        box-sizing: border-box;
    }

    .weather__wrapper__forecast-menu {
        flex: 1;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        max-height: 22px;
        border-bottom: 1px solid white;
    }

    .weather__wrapper__forecast-menu a {
        flex: 1;
        flex-direction: row;
        max-width: 100px;
        max-height: 20px;
        color: white;
    }

    .weather__wrapper__forecast-menu a.active, .weather__wrapper__forecast-menu a:hover {
        border-bottom: 2px solid white;
        text-decoration: none;
    }
</style>

<div class="weather__wrapper">
  <div class="weather__wrapper-background"></div>
  <div class="weather__wrapper-spinner"></div>
  <div class="weather__wrapper-body">
    <div class="weather__wrapper__options-btn">
      <button on:click={refreshWeather}><i class="fas fa-search-location"></i></button>
    </div>
    <div class="weather__wrapper__settings"></div>
    <div class="weather__wrapper__weather">
      <div class="weather__wrapper__weather-column">
        <span class="weather__wrapper__weather-title">{$geolocation.getLocation()}</span>
        <span class="weather__wrapper__weather-date">{$weather.getDate()}</span>
        <span class="weather__wrapper__weather-details">
          <span style="color: yellow">
            <i class="fas fa-sun"></i>
          </span>
          {$weather.getDescription()}
        </span>
      </div>
      <div class="weather__wrapper__weather-column">
        <div class="weather__wrapper__weather-temperature">{$weather.getTemperature('temp')}</div>
        <div class="weather__wrapper__weather-min-max">{$weather.getTemperature('tempMin')}° / {$weather.getTemperature('tempMax')}°</div>
      </div>
    </div>
  </div>

  <div class="weather__wrapper__forecast">
    <div class="weather__wrapper__forecast-menu">
      <a href="#" class="active">Hourly</a>
      <a href="#">Daily</a>
      <a href="#">Details</a>
    </div>
    <div class="weather__wrapper__forecast-day"></div>
  </div>
</div>
