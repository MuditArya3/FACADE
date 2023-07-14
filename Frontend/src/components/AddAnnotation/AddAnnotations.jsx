import {
    Accordion,
    AccordionSummary,
    Box,
    Button,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchEndpoints } from "./AddAnnotation.js";
import { Delete } from "@mui/icons-material";

const AddAnnotations = () => {
    const [swaggerData, setSwaggerData] = useState();
    const [endpoints, setEndpoints] = useState([]);
    const [uniqueEndpoints, setUniqueEndpoints] = useState([]);
    const [selectedApi, setSelectedApi] = useState("");
    const [selectedMethod, setSelectedMethod] = useState("");
    const [serviceInput, setServiceInput] = useState("");
    const [operationInput, setOperationInput] = useState("");
    const [methods, setMethods] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [annotationTable, setAnnotationTable] = useState([]);
    useEffect(() => {
        if (swaggerData) {
            fetchEndpoints(swaggerData, setEndpoints);
        }
    }, [swaggerData]);

    useEffect(() => {
        const uniqueEndpoints = Array.from(
            new Set(endpoints.map((endpoint) => endpoint.split("--")[0]))
        );
        setUniqueEndpoints(uniqueEndpoints);
    }, [endpoints]);

    const allowedExtensions = /\.(json)$/i;

    const handleInputChange = (e) => {
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

    const handleEndpointChange = (event) => {
        setSelectedApi(event.target.value);
        setSelectedMethod(""); // Reset the selected method when the API changes

        const selectedEndpoint = event.target.value;

        // Filter the endpoints based on the selected API
        const filteredEndpoints = endpoints.filter(
            (endpoint) => endpoint.split("--")[0] === selectedEndpoint
        );

        // Extract the methods from the filtered endpoints
        const methods = filteredEndpoints.map(
            (endpoint) => endpoint.split("--")[1]
        );

        setMethods(methods);
    };

    const handleMethodChange = (event) => {
        setSelectedMethod(event.target.value);
    };

    const handleServiceInputChange = (event) => {
        setServiceInput(event.target.value);
    };

    const handleOperationInputChange = (event) => {
        setOperationInput(event.target.value);
    };

    const handleSave = () => {
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

    const handleDownload = () => {
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

    const handleDelete = (index) => {
        const updatedAnnotationTable = [...annotationTable];
        const deletedRow = updatedAnnotationTable.splice(index, 1)[0];

        const updatedSwaggerData = [...swaggerData];
        const endpointData =
            updatedSwaggerData.paths[deletedRow.endpoint][deletedRow.method];
        delete endpointData["x_cw_operation"];
        delete endpointData["x_cw_service"];

        setAnnotationTable(updatedAnnotationTable);
        setSwaggerData(updatedSwaggerData);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundImage:
                    "linear-gradient(to right, rgb(142, 171, 233) , rgb(156, 65, 179))",
                minHeight: "100vh",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                    marginTop: "15vh",
                }}
            >
                <div
                    style={{
                        width: "80%",
                        marginRight: "10rem",
                        marginTop: "1rem",
                    }}
                >
                    <Input
                        type="file"
                        sx={{
                            pointerEvents: "auto",
                            width: "100%",
                            fontSize: "1.5rem",
                        }}
                        accept="application/json"
                        onChange={handleInputChange}
                    />
                </div>
                <FormControl
                    sx={{
                        width: "100%",
                        display: "flex",
                        //justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                        pointerEvents: "auto",
                        marginRight: "10rem",
                    }}
                >
                    <InputLabel
                        id="table-select-label"
                        sx={{ fontSize: "1.5rem" }}
                    >
                        Select Endpoint:
                    </InputLabel>
                    <Select
                        labelId="table-select-label"
                        id="table-select"
                        value={selectedApi}
                        onChange={handleEndpointChange}
                        label="Select Annotation:"
                        sx={{
                            flex: 1,
                            ml: 1,
                            backgroundColor: "snow",
                            width: "300px",
                        }}
                        className="scrollable"
                    >
                        <MenuItem value={""}>
                            <em>None</em>
                        </MenuItem>
                        {uniqueEndpoints.map((endpoint, index) => {
                            const displayValue = endpoint.split("--")[0];
                            return (
                                <MenuItem
                                    value={endpoint}
                                    key={index}
                                    sx={{
                                        fontSize: "1.3rem",
                                    }}
                                >
                                    {displayValue}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <FormControl
                    sx={{
                        width: "100%",
                        display: "flex",
                        //justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                        pointerEvents: "auto",
                        marginRight: "10rem",
                    }}
                >
                    <InputLabel
                        id="table-select-label"
                        sx={{ fontSize: "1.5rem" }}
                    >
                        Select Method:
                    </InputLabel>
                    <Select
                        labelId="table-select-label"
                        id="table-select"
                        value={selectedMethod}
                        onChange={handleMethodChange}
                        label="Select Annotation:"
                        sx={{ flex: 1, ml: 1, backgroundColor: "snow" }}
                        className="scrollable"
                    >
                        <MenuItem value={""}>
                            <em>None</em>
                        </MenuItem>
                        {methods.map((method, index) => (
                            <MenuItem value={method} key={index}>
                                {method}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <Accordion
                sx={{
                    boxShadow: "1px 1px 1px 2px rgba(0, 0, 0, 0.2)",
                    borderRadius: 1,
                    marginTop: "3rem",
                }}
            >
                <AccordionSummary>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginRight: "20px",
                                }}
                            >
                                <label>Services:</label>
                                <input
                                    type="text"
                                    value={serviceInput}
                                    onChange={handleServiceInputChange}
                                    style={{ marginTop: "5px", padding: "5px" }}
                                />
                            </Box>
                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <label>Operations:</label>
                                <input
                                    type="text"
                                    value={operationInput}
                                    onChange={handleOperationInputChange}
                                    style={{ marginTop: "5px", padding: "5px" }}
                                />
                            </Box>
                        </Box>
                        <Button
                            sx={{
                                pointerEvents: "auto",
                                height: "5rem",
                                marginTop: "2rem",
                                fontSize: "1rem",
                            }}
                            variant="contained"
                            size="small"
                            type="button"
                            marg
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </Box>
                </AccordionSummary>
            </Accordion>
            {errorMessage && (
                <Typography
                    variant="subtitle2"
                    color="error"
                    sx={{
                        marginTop: "1rem",
                        fontSize: "1.5rem",
                        padding: "1rem",
                        fontWeight: 600,
                    }}
                >
                    {errorMessage}
                </Typography>
            )}

            {annotationTable.length > 0 && (
                <div style={{ marginTop: "1.8rem", width: "50%" }}>
                    <TableContainer
                        style={{ maxHeight: "199px", overflow: "auto" }}
                    >
                        <Table
                            style={{
                                border: "1px solid snow",
                                background: "#fff",
                            }}
                        >
                            <TableHead>
                                <TableRow style={{ fontSize: "1.2rem" }}>
                                    <TableCell
                                        style={{
                                            fontSize: "1.2rem",
                                        }}
                                    >
                                        Endpoint
                                    </TableCell>

                                    <TableCell
                                        style={{
                                            fontSize: "1.2rem",
                                        }}
                                    >
                                        Method
                                    </TableCell>

                                    <TableCell
                                        style={{
                                            fontSize: "1.2rem",
                                        }}
                                    >
                                        Service
                                    </TableCell>

                                    <TableCell
                                        style={{
                                            fontSize: "1.2rem",
                                        }}
                                    >
                                        Operation
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: "1.2rem",
                                        }}
                                    >
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {annotationTable.map((row, index) => (
                                    <TableRow key={index} style={{ zIndex: 0 }}>
                                        <TableCell
                                            style={{
                                                fontSize: "1.2rem",
                                                zIndex: 0,
                                            }}
                                        >
                                            {row.endpoint}
                                        </TableCell>

                                        <TableCell
                                            style={{
                                                fontSize: "1.2rem",
                                                zIndex: 0,
                                            }}
                                        >
                                            {row.method}
                                        </TableCell>

                                        <TableCell
                                            style={{
                                                fontSize: "1.2rem",
                                                zIndex: 0,
                                            }}
                                        >
                                            {row.service}
                                        </TableCell>

                                        <TableCell
                                            style={{
                                                fontSize: "1.2rem",
                                                zIndex: 0,
                                            }}
                                        >
                                            {row.operation}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: "1.2rem",
                                                zIndex: 0,
                                            }}
                                        >
                                            <Button
                                                onClick={() =>
                                                    handleDelete(index)
                                                }
                                            >
                                                <Delete />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
            <div
                style={{
                    marginTop: "auto",
                    marginBottom: "2rem",
                }}
            >
                <Button
                    sx={{
                        pointerEvents: "auto",
                        height: "5rem",
                        fontSize: "1rem",
                    }}
                    variant="contained"
                    size="small"
                    type="button"
                    marg
                    onClick={handleDownload}
                >
                    Download
                </Button>
            </div>
        </div>
    );
};

export default AddAnnotations;
