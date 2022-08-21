const request = require("postman-request");

const geocode = (address, callback) => {
  const geocodeUrl = `http://api.positionstack.com/v1/forward?access_key=326eb6f94328b3a1bf101a6553b1f303&query=${encodeURIComponent(
    address
  )}&limit=1`;
  request({ url: geocodeUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the internet", undefined);
    } else if (body.error || body.data.length === 0) {
      callback("No matching results found. Try another search.", undefined);
    } else {
      const { latitude, longitude, label } = body.data[0];
      const data = {
        latitude,
        longitude,
        label,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
