import { postApi } from "../baseApiService";

export const PostJson = async (data) => {
    const baseURL ="https://localhost:7184/api/ServiceInt"
    try {
        const headers = {
            'Content-Type': 'application/json'
        };
        const jsonData = JSON.stringify(data);
        const response = await postApi(baseURL, jsonData,headers);
        console.log("parameters", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching jsondata:", error);
        throw error;
    }
};