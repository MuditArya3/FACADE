import { json } from "react-router-dom";
import { ParameterPostApi } from "../../Services/EndpointServices/EndpointService";

export const handleNameChange = (event, setSelectedValue) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
};

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

export const handleData = (columns, handleSave) => {

    localStorage.setItem("ColumnData",JSON.stringify(columns));
    console.log(columns);
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

    handleSave(uu);
};

export const handleSave = (data, jsonfile, setJsonData) => {
    var json = Object.assign({}, data);
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
