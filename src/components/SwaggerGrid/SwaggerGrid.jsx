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
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
    EndpointPostApi,
    ParameterPostApi,
} from "../../Services/EndpointServices/EndpointService";
import {
    handleNameChange,
    handleFileSelectChange,
    handleData,
    handleSave,
    handlecreatefile,
} from "./SwaggerGrid";

const SwaggerGrid = ({ jsonData, setJsonData }) => {
    const [swaggerData, setSwaggerData] = useState();
    const [columns, setColumns] = useState([]);
    const [jsonfile, setJsonfile] = useState([]);
    const [endpoints, setEndpoints] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const selectedEndpoint = selectedValue.split("--")[0];
    const selectedEndpointType = selectedValue.split("--")[1];

    const fetchData = async () => {
        try {
            const swaggertext = JSON.stringify(swaggerData);
            const response = await EndpointPostApi(swaggertext);
            console.log("Endpoints", response);
            setEndpoints(response);
        } catch (error) {
            console.error("Error fetching endpoints:", error);
        }
    };

    useEffect(() => {
        swaggerData && fetchData();
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
            fetchParameters();
        }
    }, [selectedValue]);

    const handleSave = (data) => {
        console.log(data);
        console.log(jsonfile);
        var json = Object.assign({}, data);
        console.log(json);
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

    const handleInputChange = (e) => {
        handleFileSelectChange(e, setSwaggerData);
        setShowMessage(false); // Reset showMessage to false when file input changes
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

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 4,
                marginTop: "8rem",
            }}
        >
            <Typography variant="h4" sx={{ mb: 2, marginBottom: "4rem" }}>
                Facade Application
            </Typography>
            <Accordion
                sx={{
                    width: "100%",
                    boxShadow: "1px 1px 1px 2px rgba(0, 0, 0, 0.2)",
                    height: "27rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "#fbf7f7",
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
                                justifyContent: "space-evenly",
                                width: "100%",
                                pb: 2,
                                pt: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
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
                                        width: "100%", // Adjust the width as needed
                                        //height: 40, // Adjust the height as needed
                                        fontSize: "1.5rem",
                                    }}
                                    accept=".json"
                                    onChange={handleInputChange}
                                />
                            </Box>

                            {!showMessage && endpoints.length > 0 && (
                                <>
                                    <FormControl
                                        sx={{
                                            width: "17%",
                                            maxWidth: "17%",
                                            minWidth: "22%",
                                            pointerEvents: "auto",
                                            ml: "1%",
                                            marginTop: "7px",
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
                                        >
                                            <MenuItem value={""}>
                                                <em>None</em>
                                            </MenuItem>
                                            {endpoints.map(
                                                (endpoint, index) => {
                                                    const displayValue =
                                                        endpoint.split("--")[2];
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
                                </>
                            )}
                        </Box>
                    </form>
                </AccordionSummary>
            </Accordion>
            {swaggerData && endpoints.length === 0 && (
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontSize: "1.3rem",
                        padding: "1rem",
                        fontWeight: 600,
                        color: "#a10c0c",
                    }}
                >
                    Please upload a JSON file with proper data annotation!!
                </Typography>
            )}
        </Container>
    );
};

export default SwaggerGrid;
