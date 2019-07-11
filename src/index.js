require("babel-core/register");
require("babel-polyfill");

import getCoords from './services/yandex.js';

const main = async (cityName) => {
    console.log(cityName);
    const coords = await getCoords(cityName);
    console.log(coords);
};

main('Novosibirsk');