import axios from 'axios';

import ServiceUnavailable from './../errors/ServiceUnavailable';

const DEFAULT_HOST = 'https://geocode-maps.yandex.ru/1.x/';

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
    const coords = firstRes.GeoObject.Point.pos.split(' ').reverse();

    return coords;
};

/**
 * @method getCoordsByName - получает координаты из Яндекс Апи по названию
 *
 * @param {String} cityName - название города чьи координаты надо получить
 * 
 * @throws {ServiceUnavailable}
 * @return {Array.<String>} координаты
 */
const getCoordsByName = async ({ config, cityName }) => {
    // @TODO: create once
    const axiosInstance = axios.create({
        baseURL: config.YANDEX.HOST || DEFAULT_HOST,
        timeout: 10000,
    });

    try {
        const response = await axiosInstance.get('', {
            params: {
                format: 'json',
                geocode: cityName
            }
        });
    
        return getCoordsFromYandexResponse(response.data.response);
    } catch (error) {
        throw new ServiceUnavailable(error);
    }
};

export default getCoordsByName;