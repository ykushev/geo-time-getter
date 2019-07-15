import axios from 'axios';

import ServiceUnavailable from './../errors/ServiceUnavailable';

const HOST_DEFAULT = 'https://maps.googleapis.com/';

/**
 * @method getTimezoneByCoords - getting from google
 *
 * @param {Object} config 
 * @param {Array.<String>} coords
 * 
 * @throws {ServiceUnavailable}
 * @return {Object} google response https://developers.google.com/maps/documentation/timezone/intro
 */
const getTimezoneByCoords = async ({ config, coords }) => {
    // @TODO: create once
    const axiosInstance = axios.create({
        baseURL: config.GOOGLE.HOST || HOST_DEFAULT,
        timeout: 10000,
    });

    try {
        const { data } = await axiosInstance.get('maps/api/timezone/json', {
            params: {
                location: coords.join(','),
                timestamp: Date.now() / 1000,
                key: config.GOOGLE.apiKey
            }
        });
        return data;
    } catch (error) {
        throw new ServiceUnavailable(error);
    }
};

export default getTimezoneByCoords;