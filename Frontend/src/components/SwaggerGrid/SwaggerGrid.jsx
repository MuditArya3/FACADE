import {
    Accordion,
    AccordionSummary,
    Box,
    Button,
    Container,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    makeStyles,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
    EndpointPostApi,
    ParameterGetApi,
    ParameterPostApi,
} from "../../Services/EndpointServices/EndpointService";
import {
    handleNameChange,
    handleFileSelectChange,
    handleData,
    fetchData,
    fetchService,
    handleService,
} from "./SwaggerGrid";

import "./SwaggerGrid.css";
import c from "../../assets/3.jpg";
import { useNavigate } from "react-router-dom";

const SwaggerGrid = ({ jsonData, setJsonData }) => {
    const [swaggerData, setSwaggerData] = useState();
    const [columns, setColumns] = useState([]);
    const [jsonfile, setJsonfile] = useState([]);
    const [endpoints, setEndpoints] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [showInvalidFileType, setShowInvalidFileType] = useState(false);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [updatedEndpoints, setUpdatedEndpoints] = useState([]);
    const [updatedServices, setUpdatedServices] = useState([]);
    const [selectedFileName, setSelectedFileName] = useState("");

    const selectedEndpoint = selectedValue.split("--")[0];
    const selectedEndpointType = selectedValue.split("--")[1];

    const uniqueServices = services.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (swaggerData) {
    //         fetchData(swaggerData, (fetchedEndpoints) => {
    //             setEndpoints(fetchedEndpoints);
    //             setUpdatedEndpoints(fetchedEndpoints);
    //         });
    //     }
    // }, [swaggerData]);

    useEffect(() => {
        if (swaggerData) {
            fetchService(swaggerData, (fetchedServices) => {
                setServices(fetchedServices);
                setUpdatedServices(fetchedServices);
            });
        }
    }, [swaggerData]);

    useEffect(() => {
        if (selectedValue) {
            const fetchParameters = async () => {
                try {
                    const headers = {
                        endPoint: selectedEndpoint,
                        endPointType: selectedEndpointType,
                        "Content-Type": "application/json",
                    };
                    const swaggertext = JSON.stringify(swaggerData);

                    let response = [];
                    if (selectedEndpointType === "get") {
                        response = await ParameterGetApi(swaggertext, headers);
                    } else {
                        response = await ParameterPostApi(swaggertext, headers);
                    }
                    console.log("Parameters", response);
                    setColumns(response);
                } catch (error) {
                    console.error("Error fetching parameters:", error);
                }
            };
            fetchParameters();
        }
    }, [selectedValue]);

    const handleSave = (data) => {
        var json = Object.assign({}, data);

        handlecreatefile({
            label: "search",
            title: "Search Form",
            description: "Search using below Textbox",
            type: "object",
            properties: json,
        });
    };

    const handlecreatefile = (data) => {
        const json = JSON.stringify(data);
        setJsonData(json);
        localStorage.setItem("jsonSchema", json);
    };

    const handleFormSubmit = () => {
        handleData(columns, handleSave);
    };

    const allowedExtensions = /\.(json)$/i;

    const handleInputChange = (e) => {
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

    const handlePreviousButton = () => {
        setSwaggerData(null);
        setEndpoints([]);
        setShowMessage(false);
        setShowInvalidFileType(false);
    };

    useEffect(() => {
        if (swaggerData) {
            if (endpoints.length === 0) {
                setShowMessage(true);
            } else {
                setShowMessage(false);
            }
        } else {
            setShowMessage(false);
        }
    }, [endpoints, swaggerData]);

    const filteredEndpoints = endpoints.filter((endpoint) =>
        endpoint
            .toLowerCase()
            .includes(selectedService.toLowerCase().split(" ")[0])
    );

    const handleUploadedFileClick = (fileName) => {
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

    return (
        <div
            className="acc-container"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <img className="bg_image" src={c} />
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 600,
                    color: "white",
                    zIndex: 1,
                    position: "relative",
                    marginTop: "6rem",
                    textAlign: "center",
                }}
            >
                Facade Application
            </Typography>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    py: 4,
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                <Accordion
                    sx={{
                        width: "35%",
                        boxShadow: "1px 1px 1px 2px rgba(0, 0, 0, 0.2)",
                        height: "70vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        backgroundColor: "white",
                    }}
                >
                    <AccordionSummary
                        sx={{
                            pointerEvents: "none",
                            cursor: "default",
                        }}
                        aria-controls="panel-content"
                        id="panel-header"
                    >
                        <form className="forms">
                            <Box
                                sx={{
                                    display: "flex",
                                    //justifyContent: "space-evenly",
                                    width: "100%",
                                    pb: 2,
                                    pt: 2,
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                {endpoints.length === 0 && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        <InputLabel
                                            htmlFor="json-file"
                                            id="json-file-label"
                                            sx={{ fontSize: "1rem" }}
                                        >
                                            Upload a JSON file with annotations
                                        </InputLabel>
                                        <Input
                                            type="file"
                                            sx={{
                                                pointerEvents: "auto",
                                                width: "70%",
                                                fontSize: "1.5rem",
                                            }}
                                            accept="application/json"
                                            onChange={handleInputChange}
                                        />
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontSize: "1.5rem",
                                                padding: "1rem",
                                                fontWeight: 500,
                                                color: "black",
                                            }}
                                        >
                                            Or
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontSize: "1.5rem",
                                                padding: "1rem",
                                                fontWeight: 500,
                                                color: "black",
                                            }}
                                        >
                                            Click here to add annotations to
                                            your file
                                        </Typography>
                                        <Button
                                            sx={{
                                                pointerEvents: "auto",
                                                height: "5rem",
                                                fontSize: "0.9rem",
                                                width: "8.8rem",
                                            }}
                                            variant="contained"
                                            size="small"
                                            type="button"
                                            marg
                                            onClick={() => navigate("/json")}
                                        >
                                            Add
                                        </Button>
                                    </Box>
                                )}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        width: "100%",
                                        mt: "5rem",
                                    }}
                                >
                                    {swaggerData && endpoints.length === 0 && (
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontSize: "1.5rem",
                                                padding: "1rem",
                                                fontWeight: 600,
                                                color: "red",
                                            }}
                                        >
                                            Please upload a JSON file with
                                            proper data annotation!!
                                        </Typography>
                                    )}
                                    {showInvalidFileType && (
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontSize: "1.5rem",
                                                padding: "1rem",
                                                fontWeight: 500,
                                                color: "red",
                                            }}
                                        >
                                            Invalid file type. Please select a
                                            valid JSON file.
                                        </Typography>
                                    )}
                                </Box>
                                {!showMessage && endpoints.length > 0 && (
                                    <>
                                        <FormControl
                                            sx={{
                                                width: "80%",
                                                display: "flex",
                                                //justifyContent: "space-between",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                mb: 2,
                                                pointerEvents: "auto",
                                            }}
                                        >
                                            <InputLabel
                                                id="table-select-label"
                                                sx={{ fontSize: "1.5rem" }}
                                            >
                                                Select Service:
                                            </InputLabel>
                                            <Select
                                                labelId="table-select-label"
                                                id="table-select"
                                                value={selectedService}
                                                onChange={(e) => {
                                                    handleService(
                                                        e,
                                                        setSelectedService
                                                    );
                                                }}
                                                label="Select Service:"
                                                sx={{ flex: 1, ml: 1 }}
                                            >
                                                <MenuItem value={""}>
                                                    <em>None</em>
                                                </MenuItem>
                                                {uniqueServices.map(
                                                    (service, index) => {
                                                        return (
                                                            <MenuItem
                                                                value={service}
                                                                key={index}
                                                                sx={{
                                                                    fontSize:
                                                                        "1.3rem",
                                                                }}
                                                            >
                                                                {service}
                                                            </MenuItem>
                                                        );
                                                    }
                                                )}
                                            </Select>
                                        </FormControl>
                                        <FormControl
                                            sx={{
                                                width: "80%",
                                                display: "flex",
                                                //justifyContent: "space-between",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                mb: 2,
                                                pointerEvents: "auto",
                                            }}
                                        >
                                            <InputLabel
                                                id="table-select-label"
                                                sx={{ fontSize: "1.5rem" }}
                                            >
                                                Select Api:
                                            </InputLabel>
                                            <Select
                                                labelId="table-select-label"
                                                id="table-select"
                                                value={selectedValue}
                                                onChange={(e) => {
                                                    handleNameChange(
                                                        e,
                                                        setSelectedValue
                                                    );
                                                }}
                                                label="Select Annotation:"
                                                sx={{ flex: 1, ml: 1 }}
                                                className="scrollable"
                                            >
                                                <MenuItem value={""}>
                                                    <em>None</em>
                                                </MenuItem>
                                                {filteredEndpoints.map(
                                                    (endpoint, index) => {
                                                        const displayValue =
                                                            endpoint.split(
                                                                "--"
                                                            )[2];
                                                        return (
                                                            <MenuItem
                                                                value={endpoint}
                                                                key={index}
                                                                sx={{
                                                                    fontSize:
                                                                        "1.3rem",
                                                                }}
                                                            >
                                                                {displayValue}
                                                            </MenuItem>
                                                        );
                                                    }
                                                )}
                                            </Select>
                                        </FormControl>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-evenly",
                                                width: "100%",
                                                mt: "5rem",
                                            }}
                                        >
                                            <Button
                                                sx={{
                                                    pointerEvents: "auto",
                                                    height: "5rem",
                                                    fontSize: "0.9rem",
                                                    width: "8.8rem",
                                                }}
                                                variant="contained"
                                                size="small"
                                                type="button"
                                                marg
                                                onClick={handlePreviousButton}
                                            >
                                                Previous
                                            </Button>
                                            <Button
                                                sx={{
                                                    pointerEvents: "auto",
                                                    height: "5rem",
                                                }}
                                                variant="contained"
                                                size="small"
                                                type="button"
                                                marg
                                                onClick={handleFormSubmit}
                                            >
                                                Save Mapping
                                            </Button>
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </form>
                    </AccordionSummary>
                </Accordion>
                {uploadedFiles.length > 0 && (
                    <Accordion
                        className="toprightaccordian"
                        style={{
                            position: "absolute",
                            top: "4rem",
                            right: "8rem",
                            borderRadius: "4px",
                        }}
                    >
                        <AccordionSummary>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    my: 2,
                                }}
                            >
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    Uploaded Files:
                                </Typography>
                                {uploadedFiles.map((file, index) => (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        onClick={(e) =>
                                            handleUploadedFileClick(file.name)
                                        }
                                        sx={{
                                            my: 1,
                                            backgroundColor:
                                                selectedFileName === file.name
                                                    ? "lightblue"
                                                    : "transparent",
                                        }}
                                    >
                                        {file.name}
                                    </Button>
                                ))}
                            </Box>
                        </AccordionSummary>
                    </Accordion>
                )}
            </Container>
        </div>
    );
};

export default SwaggerGrid;
