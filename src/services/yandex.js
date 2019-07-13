import axios from 'axios';

import { YANDEX } from '../config';

const axiosInstance = axios.create({
    baseURL: YANDEX.HOST,
    timeout: 10000,
});

/**
 * @method getCoordsFromYandexResponse - Достаёт координаты из http ответа яндекса
 * @private
 * 
 * @param {Object} yandexRes - объект http ответа яндекса
 *
 * @return {Array.<String>} Массив координат
 */
const getCoordsFromYandexResponse = (yandexRes) => {
    if (!yandexRes.GeoObjectCollection || !yandexRes.GeoObjectCollection.featureMember) {
        throw new Error;
    }
    const firstRes = yandexRes.GeoObjectCollection.featureMember[0];

    if (!firstRes ||
        !firstRes.GeoObject ||
        !firstRes.GeoObject.Point ||
        !firstRes.GeoObject.Point.pos) {
        throw new Error;
    }
    const coords = firstRes.GeoObject.Point.pos.split(' ');

    return coords;
};

/**
 * @method getCoords - получает координаты из Яндекс Апи по названию
 *
 * @param {String} cityName - название города чьи координаты надо получить
 * 
 * @return {Array.<String>} координаты
 */
const getCoords = async (cityName) => {

    const response = await axiosInstance.get('', {
        params: {
            format: 'json',
            geocode: cityName
        }
    });

    return getCoordsFromYandexResponse(response.data.response);
};

export default getCoords;