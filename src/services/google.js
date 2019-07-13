import axios from 'axios';

import { GOOGLE } from '../config';

const axiosInstance = axios.create({
    baseURL: GOOGLE.HOST,
    timeout: 10000,
});

const getTimezoneByCoords = async (coords) => {
    const { data } = await axiosInstance.get('maps/api/timezone/json', {
        params: {
            location: coords.join(',')
        }
    });

    console.log(data);
    return data;
};

export default getTimezoneByCoords;