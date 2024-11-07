const axios = require('axios');

const HttpError = require('../models/http-error');

async function getCoordsForAddress(address) {
  // return {
  //   lat: 40.7484474,
  //   lng: -73.9871516
  // };
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  );

  const data = response.data;

  if (!data || data.length === 0) {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  const coordinates = {
    lat: data[0].lat,
    lng: data[0].lon
  };

  return coordinates;
}

module.exports = getCoordsForAddress;