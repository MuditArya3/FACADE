import axios from "axios";

export const getApi = async baseURL => {
    const response = await axios.get(baseURL);
    return response;
};

export const putApi = async (apiURL, data) => {
    const response = await axios.put(apiURL, data);
    return response;
};

export const delApi = async apiURL => {
    const response = await axios.delete(apiURL);
    return response;
};

export const postApi = async (baseURL, data, headers) => {
    const reponse = await axios.post(baseURL, data, { headers });
    return reponse;
};
