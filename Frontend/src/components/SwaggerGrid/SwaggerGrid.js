import { json } from "react-router-dom";
import { EndpointPostApi, EndpointServicePostApi, ParameterPostApi } from "../../Services/EndpointServices/EndpointService";

export const handleNameChange = (event, setSelectedValue) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setSelectedValue(selectedValue);
    localStorage.setItem("Annotation",JSON.stringify(selectedValue));
};

export const handleService = (event, setSelectedService) => {
    setSelectedService(event.target.value)
}

export const handleFileSelectChange = (e, setSwaggerData) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const data = JSON.parse(reader.result);
            setSwaggerData(data);
        } catch (error) {
            console.error("Error parsing Swagger data:", error);
        }
    };
    reader.readAsText(file);
};

export const handleData = (inputValue) => {
    localStorage.setItem("inputValue", inputValue);
    window.open("/mapping", "_blank");
};


export const handleSave = (data, jsonfile, setJsonData) => {
    let json = Object.assign({}, data);
    handlecreatefile({
        label: "search",
        title: "Search Form",
        description: "Search using below Textbox",
        type: "object",
        properties: json,
    }, jsonfile, setJsonData);
};

export const handlecreatefile = (data, setJsonData) => {
    const json = JSON.stringify(data);
    setJsonData(json);
    localStorage.setItem("jsonSchema", json);
};

export   const fetchParameters = async (selectedEndpoint,selectedEndpointType,setColumns,swaggerData) => {
    try {
        const headers = {
            endPoint: selectedEndpoint,
            endPointType: selectedEndpointType,
            "Content-Type": "application/json",
        };
        const swaggertext = JSON.stringify(swaggerData);
        const response = await ParameterPostApi(
            swaggertext,
            headers
        );
        console.log("Parameters", response);
        setColumns(response);
    } catch (error) {
        console.error("Error fetching parameters:", error);
    }
};

export  const fetchData = async (swaggerData, setEndpoints) => {
    try {
        const swaggertext = JSON.stringify(swaggerData);
        const response = await EndpointPostApi(swaggertext);
        setEndpoints(response);
    } catch (error) {
        console.error("Error fetching endpoints:", error);
    }
};

export  const fetchService = async (swaggerData, setService) => {
    try {
        const swaggertext = JSON.stringify(swaggerData);
        const response = await EndpointServicePostApi(swaggertext);
        setService(response);
        console.log(response);
    } catch (error) {
        console.error("Error fetching service:", error);
    }
};


export const handleUploadedFileClick = (fileName,uploadedFiles,setUpdatedEndpoints,setEndpoints,setUpdatedServices,setServices,setSelectedService,setSelectedValue,setSwaggerData,setSelectedFileName) => {
    // Find the file data based on the clicked file name
    const fileData = uploadedFiles.find((file) => file.name === fileName);

    if (fileData) {
        const { data } = fileData;

        fetchData(data, (fetchedEndpoints) => {
            setUpdatedEndpoints(fetchedEndpoints);
            setEndpoints(fetchedEndpoints);
        });

        fetchService(data, (fetchedServices) => {
            setUpdatedServices(fetchedServices);
            setServices(fetchedServices);
        });

        setSelectedService("");
        setSelectedValue("");
        setSwaggerData(data);
        setSelectedFileName(fileName);
    }
};

export const handleInputChange = (e,allowedExtensions,setSwaggerData,setEndpoints,setUpdatedEndpoints,setUploadedFiles,setShowMessage,setShowInvalidFileType) => {
    const file = e.target.files[0];

    if (file && allowedExtensions.test(file.name)) {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const fileData = JSON.parse(reader.result);
                setSwaggerData(fileData);
                fetchData(fileData, (fetchedEndpoints) => {
                    setEndpoints(fetchedEndpoints);
                    setUpdatedEndpoints(fetchedEndpoints);
                    fetchedEndpoints.length > 0 &&
                        setUploadedFiles((prevUploadedFiles) => [
                            ...prevUploadedFiles,
                            { name: file.name, data: fileData },
                        ]);
                });
                setShowMessage(false);
                setShowInvalidFileType(false);
            } catch (error) {
                console.error("Error parsing Swagger data:", error);
                setShowMessage(true);
            }
        };
        reader.readAsText(file);
    } else {
        setSwaggerData(null);
        setEndpoints([]);
        setShowMessage(false);
        setShowInvalidFileType(true);
    }
};

// export const handleFormSubmit = (columns,jsonfile,setJsonData) => {
//     handleData(columns,jsonfile,setJsonData);
// };

// export const handlePreviousButton = (setSwaggerData,setEndpoints,setShowMessage,setShowInvalidFileType) => {
//     setSwaggerData(null);
//     setEndpoints([]);
//     setShowMessage(false);
//     setShowInvalidFileType(false);
// };