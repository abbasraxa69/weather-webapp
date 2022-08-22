const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const forecastUrl = `http://api.weatherstack.com/current?access_key=781ccb7e995cec6047606e5b44025f96&query=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}`;
  request({ url: forecastUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the internet", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      const {
        weather_descriptions,
        temperature,
        feelslike,
        precip,
        wind_speed,
      } = body.current;
      const forecastData = `${weather_descriptions}. It is currently ${temperature} degrees outside, but it feels like ${feelslike}. There is a ${precip}% chance of rain. The wind is blowing with speed of ${wind_speed}km/h`;
      callback(undefined, forecastData);
    }
  });
};

module.exports = forecast;
