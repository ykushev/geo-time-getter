require("babel-core/register");
require("babel-polyfill");

import getCoords from './services/yandex.js';
import getTimezoneByCoords from './services/google.js';

const main = async (cityName) => {
    console.log(cityName);
    const coords = await getCoords(cityName);
    console.log(coords);
    const result = getTimezoneByCoords(coords);
};

main('Novosibirsk');