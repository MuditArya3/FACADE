import { CheckURL } from "../../AppSettings";
import { postApi } from "../baseApiService";

export const EndpointPostApi = async data => {
    const baseURL = `${CheckURL}/Values/getendpoints`;
    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        const jsonData = JSON.stringify(data);
        const response = await postApi(baseURL, jsonData, headers);
        //console.log("Endpoints", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching endpoints:", error);
        throw error;
    }
};

export const AllEndpointPostApi = async data => {
    const baseURL = `${CheckURL}/Values/getallendpoints`;
    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        const jsonData = JSON.stringify(data);
        const response = await postApi(baseURL, jsonData, headers);
        //console.log("Endpoints", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching endpoints:", error);
        throw error;
    }
};

export const EndpointServicePostApi = async data => {
    const baseURL = `${CheckURL}/Values/getendpointservice`;
    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        const jsonData = JSON.stringify(data);
        const response = await postApi(baseURL, jsonData, headers);
        //console.log("Endpoints", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching endpoints:", error);
        throw error;
    }
};

export const ParameterPostApi = async (data, headers) => {
    const baseURL = `${CheckURL}/Values/getparameters`;
    try {
        const jsonData = JSON.stringify(data);
        const response = await postApi(baseURL, jsonData, headers);
        console.log("parameters", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching parameters:", error);
        throw error;
    }
};

export const ParameterGetApi = async (data, headers) => {
    const baseURL = `${CheckURL}/Values/getresponce`;
    try {
        const jsonData = JSON.stringify(data);
        const response = await postApi(baseURL, jsonData, headers);
        console.log("parameters", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching parameters:", error);
        throw error;
    }
};