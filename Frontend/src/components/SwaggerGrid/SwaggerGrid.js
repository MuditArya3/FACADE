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

export const handleData = (columns,jsonfile,setJsonData) => {
    // if(columns.forEach((e)=>{
    //     console.log(e);
    // }))
    localStorage.setItem("ColumnData",JSON.stringify(columns));
    let uu = {};
    columns.forEach((column) => {
        const layout = {
            key: column.Name,
            title: column.Name,
            type: column.Type.toLowerCase(),
        };

        uu[column.Name] = { ...layout };
    });

    let x = `fetch('https://yrzoud88dh5x80f4266.simplifycloudlab.com/v4_6_release/apis/3.0/service/tickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization':'Basic cGVubWFuYWdlKzhldDRWUVZZb0taQ1hMeTQ6NUdNc0h3OVNZdEV0RTI5Zw==',
            'clientId':'f9163e2b-a465-46e4-8f42-0a193c68ee9c',
        },
        body:JSON.stringify({})
      }).then(function (response) {
      console.log(response,'gagan');
        if (response.ok) {
          return response.json();
        }
        //throw response;
      }).then(function (data) {
        console.log(data);
      }).catch(function (error) {
        console.warn(error);
      });
      input: true,
      `;

    uu["custom"] = x;
    window.open("/mapping", "_blank");
    handleSave(uu,jsonfile,setJsonData);
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
