import axios from 'axios';

const HOST_DEFAULT = 'https://maps.googleapis.com/';

const getTimezoneByCoords = async ({ config, coords }) => {
    // @TODO: create once
    const axiosInstance = axios.create({
        baseURL: config.GOOGLE.HOST || HOST_DEFAULT,
        timeout: 10000,
    });

    console.log({
        location: coords.join(','),
        timestamp: Date.now(),
        key: config.GOOGLE.apiKey
    });

    const { data } = await axiosInstance.get('maps/api/timezone/json', {
        params: {
            location: coords.join(','),
            timestamp: Date.now(),
            key: config.GOOGLE.apiKey
        }
    }).catch((error) => {
        console.error('google api error', error);
    });

    return data;
};

export default getTimezoneByCoords;