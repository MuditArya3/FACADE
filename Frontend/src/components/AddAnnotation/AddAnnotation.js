import { AllEndpointPostApi } from "../../Services/EndpointServices/EndpointService";


export  const fetchEndpoints = async (swaggerData, setEndpoints) => {
    try {
        const swaggertext = JSON.stringify(swaggerData);
        const response = await AllEndpointPostApi(swaggertext);
        setEndpoints(response);
    } catch (error) {
        console.error("Error fetching endpoints:", error);
    }
};