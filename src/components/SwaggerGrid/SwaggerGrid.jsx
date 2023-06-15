import {
    Accordion,
    AccordionSummary,
    Box,
    Button,
    Container,
    FormControl,
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

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 4,
            }}
        >
            <Typography variant="h4" sx={{ mb: 2 }}>
                Add API and Map Tables
            </Typography>
            <Accordion sx={{ width: "100%" }}>
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
                            <Input
                                type="file"
                                sx={{
                                    width: "27%",
                                    maxWidth: "27%",
                                    minWidth: "17%",
                                    pointerEvents: "auto",
                                }}
                                onChange={(e) => {
                                    handleFileSelectChange(e, setSwaggerData);
                                }}
                            />
                            <FormControl
                                sx={{
                                    width: "17%",
                                    maxWidth: "17%",
                                    minWidth: "17%",
                                    pointerEvents: "auto",
                                    ml: "1%",
                                    // mr: "1%",
                                }}
                            >
                                <InputLabel id="table-select-label">
                                    Select Api:
                                </InputLabel>
                                <Select
                                    labelId="table-select-label"
                                    id="table-select"
                                    value={selectedValue}
                                    onChange={(e) => {
                                        handleNameChange(e, setSelectedValue);
                                    }}
                                    label="Select Annotation:"
                                >
                                    <MenuItem value={""}>
                                        <em>None</em>
                                    </MenuItem>
                                    {endpoints.map((endpoint, index) => {
                                        const displayValue =
                                            endpoint.split("--")[2];
                                        return (
                                            <MenuItem
                                                value={endpoint}
                                                key={index}
                                            >
                                                {displayValue}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <Button
                                sx={{ pointerEvents: "auto" }}
                                variant="contained"
                                size="small"
                                type="button"
                                marg
                                onClick={() => {
                                    //setButtonClicked("SaveMapping");
                                    handleData(columns, handleSave);
                                }}
                            >
                                Save Mapping
                            </Button>
                        </Box>
                    </form>
                </AccordionSummary>
            </Accordion>
        </Container>
    );
};

export default SwaggerGrid;
