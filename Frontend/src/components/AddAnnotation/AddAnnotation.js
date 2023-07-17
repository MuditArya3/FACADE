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


const allowedExtensions = /\.(json)$/i;

export const handleInputChange = (e, setSwaggerData, setErrorMessage) => {
    const file = e.target.files[0];

    if (file && allowedExtensions.test(file.name)) {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const fileData = JSON.parse(reader.result);
                setSwaggerData(fileData);
                //fetchEndpoints(swaggerData, setEndpoints);
            } catch {
                setErrorMessage("Error parsing Swagger data");
            }
        };
        reader.readAsText(file);
    } else {
        setErrorMessage("Please upload a valid json file");
    }
};

export  const handleEndpointChange = (event, setSelectedApi, setSelectedMethod, setMethods, endpoints) => {
    setSelectedApi(event.target.value);
    setSelectedMethod("");

    const selectedEndpoint = event.target.value;

    const filteredEndpoints = endpoints.filter(
        (endpoint) => endpoint.split("--")[0] === selectedEndpoint
    );

    const methods = filteredEndpoints.map(
        (endpoint) => endpoint.split("--")[1]
    );

    setMethods(methods);
};


export const handleMethodChange = (event, setSelectedMethod) => {
    setSelectedMethod(event.target.value);
};

export const handleServiceInputChange = (event, setServiceInput) => {
    setServiceInput(event.target.value);
};

export const handleOperationInputChange = (event, setOperationInput) => {
    setOperationInput(event.target.value);
};

export const handleSave = (serviceInput,operationInput,setErrorMessage,selectedApi,selectedMethod,swaggerData, setSwaggerData, setOperationInput, setAnnotationTable, annotationTable, setServiceInput) => {
    if (!serviceInput || !operationInput) {
        setErrorMessage("Please enter the service and operation.");
    } else if (!selectedApi || !selectedMethod) {
        setErrorMessage(
            "Please select an endpoint and method before saving."
        );
    } else if (!swaggerData) {
        setErrorMessage("Please upload a valid JSON file before saving.");
    } else {
        setErrorMessage("");
        const updatedSwaggerData = { ...swaggerData };
        const endpointData =
            updatedSwaggerData.paths[selectedApi][selectedMethod];

        // Update the annotations in the endpoint data
        endpointData["x_cw_operation"] = operationInput;
        endpointData["x_cw_service"] = serviceInput;

        // Save the updated Swagger data
        setSwaggerData(updatedSwaggerData);
        console.log("Swagger data updated:", updatedSwaggerData);
        setServiceInput("");
        setOperationInput("");
        setAnnotationTable([
            {
                endpoint: selectedApi,
                method: selectedMethod,
                service: serviceInput,
                operation: operationInput,
            },
            ...annotationTable,
        ]);
    }
};

export const handleDownload = (swaggerData) => {
    if (swaggerData) {
        const jsonData = JSON.stringify(swaggerData, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "updated-swagger.json";
        link.click();
        URL.revokeObjectURL(url);
    } else {
        console.log("No Swagger data available to download.");
    }
};

export const handleDelete = (index, annotationTable,swaggerData, setAnnotationTable,setSwaggerData) => {
    const updatedAnnotationTable = [...annotationTable];
    const deletedRow = updatedAnnotationTable.splice(index, 1)[0];

    const updatedSwaggerData = { ...swaggerData };
    const endpointData =
        updatedSwaggerData.paths[deletedRow.endpoint][deletedRow.method];
    delete endpointData["x_cw_operation"];
    delete endpointData["x_cw_service"];

    setAnnotationTable(updatedAnnotationTable);
    setSwaggerData(updatedSwaggerData);
    console.log(updatedSwaggerData);
};

export const handleEdit = (index, setEditRowIndex) => {
    setEditRowIndex(index);
};

export const handleEditInputChange = (e, field, index, annotationTable, setAnnotationTable) => {
    const updatedAnnotationTable = [...annotationTable];
    updatedAnnotationTable[index][field] = e.target.value;
    setAnnotationTable(updatedAnnotationTable);
};

export const handleEditSave = (index, setEditRowIndex, annotationTable, setAnnotationTable, swaggerData, setSwaggerData) => {
    setEditRowIndex(-1);
    const updatedAnnotationTable = [...annotationTable];
    const editRow = updatedAnnotationTable[index];

    const updatedSwaggerData = { ...swaggerData };
    const endpointData =
        updatedSwaggerData.paths[editRow.endpoint][editRow.method];
    endpointData["x_cw_operation"] = editRow.operation;
    endpointData["x_cw_service"] = editRow.service;

    setAnnotationTable(updatedAnnotationTable);
    setSwaggerData(updatedSwaggerData);
};

export const handleEditCancel = (setEditRowIndex) => {
    setEditRowIndex(-1);
};