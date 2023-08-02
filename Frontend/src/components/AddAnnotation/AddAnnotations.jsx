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
import {
    fetchEndpoints,
    handleInputChange,
    handleEndpointChange,
    handleMethodChange,
    handleOperationInputChange,
    handleServiceInputChange,
    handleSave,
    handleDownload,
    handleDelete,
    handleEdit,
    handleEditInputChange,
    handleEditSave,
    handleEditCancel,
} from "./AddAnnotation.js";
import { Delete, Edit } from "@mui/icons-material";
import "../AddAnnotation/AddAnnotation.css";
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
    const [editRowIndex, setEditRowIndex] = useState(-1);
    const [descrip, setdescrip] = useState();
    const [operId, setOperId] = useState();

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
    console.log(methods.length);

    useEffect(() => {
        if (methods.length <= 1) {
            methods.forEach((m) => {
                setSelectedMethod(m);
            });
        }
    }, [methods]);
    console.log(selectedMethod);

    console.log(swaggerData);
    console.log(selectedApi);

    useEffect(() => {
        {
            swaggerData &&
                selectedApi &&
                selectedMethod &&
                swaggerData.paths[selectedApi][selectedMethod].description &&
                setdescrip(
                    swaggerData.paths[selectedApi][selectedMethod].description
                );

            console.log(descrip);
            localStorage.setItem("desc", descrip);
        }
        {
            swaggerData &&
                selectedApi &&
                selectedMethod &&
                swaggerData.paths[selectedApi][selectedMethod].operationId &&
                setOperId(
                    swaggerData.paths[selectedApi][selectedMethod].operationId
                );
            console.log(operId);
        }
    }, [swaggerData, selectedApi, selectedMethod]);

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
                    marginTop: "12vh",
                }}
            >
                <div
                    style={{
                        width: "80%",
                        marginRight: "10rem",
                        marginTop: "1rem",
                        position: "relative",
                        left: "5rem",
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
                        onChange={(e) =>
                            handleInputChange(
                                e,
                                setSwaggerData,
                                setErrorMessage
                            )
                        }
                    />
                </div>
                <div className="outerBox">
                    <FormControl
                        sx={{
                            // width: "100%",
                            display: "flex",
                            //justifyContent: "space-between",
                            // flexDirection: "row",
                            alignItems: "center",
                            pointerEvents: "auto",
                            marginRight: "10rem",
                            position: "relative",
                            left: "6rem",
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
                            onChange={(e) =>
                                handleEndpointChange(
                                    e,
                                    setSelectedApi,
                                    setSelectedMethod,
                                    setMethods,
                                    endpoints
                                )
                            }
                            label="Select Annotation:"
                            sx={{
                                flex: 1,
                                ml: 1,
                                backgroundColor: "snow",
                                width: "300px",
                            }}
                            className="scrollable"
                        >
                            {/* <MenuItem value={""}>
                            <em>None</em>
                        </MenuItem> */}
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
                    <div className="boxx">
                        {swaggerData &&
                            selectedApi &&
                            selectedMethod &&
                            (operId || descrip) && (
                                <Typography
                                    sx={{
                                        flex: 1,
                                        backgroundColor: "snow",
                                        width: "418px",
                                        left: "0",
                                        mt: "1rem",
                                        fontSize: "1.5rem",
                                        display: "flex",
                                        boxShadow:
                                            "1px 1px 1px 2px rgba(0, 0, 0, 0.2)",
                                        borderRadius: 2,
                                    }}
                                >
                                    {swaggerData &&
                                        selectedApi &&
                                        selectedMethod && (
                                            <div className="description">
                                                <h5>Details</h5>
                                                {descrip && (
                                                    <div className="descrip">
                                                        <p>Decription-</p>
                                                        {descrip}
                                                    </div>
                                                )}
                                                {operId && (
                                                    <div>
                                                        <p> OperationID-</p>
                                                        {operId}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                </Typography>
                            )}
                    </div>
                </div>
                {
                    methods.length > 1 && (
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
                                onChange={(e) =>
                                    handleMethodChange(e, setSelectedMethod)
                                }
                                label="Select Annotation:"
                                sx={{ flex: 1, ml: 1, backgroundColor: "snow" }}
                                className="scrollable"
                            >
                                {/* <MenuItem value={""}>
                            <em>None</em>
                        </MenuItem> */}
                                {methods.map((method, index) => (
                                    <MenuItem value={method} key={index}>
                                        {method}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )
                    // :(
                    //     methods.map((m)=>{
                    //         console.log(m);
                    //         return setSelectedMethod(m);
                    //     })
                    // )
                }
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
                                    onChange={(e) =>
                                        handleServiceInputChange(
                                            e,
                                            setServiceInput
                                        )
                                    }
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
                                    onChange={(e) =>
                                        handleOperationInputChange(
                                            e,
                                            setOperationInput
                                        )
                                    }
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
                            onClick={() =>
                                handleSave(
                                    serviceInput,
                                    operationInput,
                                    setErrorMessage,
                                    selectedApi,
                                    selectedMethod,
                                    swaggerData,
                                    setSwaggerData,
                                    setOperationInput,
                                    setAnnotationTable,
                                    annotationTable,
                                    setServiceInput
                                )
                            }
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
                <div
                    style={{
                        marginTop: "1.6rem",
                        width: "70%",
                    }}
                >
                    <TableContainer
                        style={{
                            maxHeight: "199px",
                            overflow: "auto",
                            marginBottom: "1rem",
                        }}
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
                                            fontSize: "1.4rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        Endpoint
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: "1.4rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        Method
                                    </TableCell>

                                    <TableCell
                                        style={{
                                            fontSize: "1.4rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        Service
                                    </TableCell>

                                    <TableCell
                                        style={{
                                            fontSize: "1.4rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        Operation
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: "1.4rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {annotationTable.map((row, index) => (
                                    <TableRow key={index} style={{ zIndex: 0 }}>
                                        {editRowIndex === index ? (
                                            <>
                                                <TableCell
                                                    style={{
                                                        fontSize: "1.2rem",
                                                        zIndex: 0,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {row.endpoint}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontSize: "1.2rem",
                                                        zIndex: 0,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {row.method}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontSize: "1.2rem",
                                                        zIndex: 0,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <input
                                                        type="text"
                                                        value={row.service}
                                                        onChange={(e) =>
                                                            handleEditInputChange(
                                                                e,
                                                                "service",
                                                                index,
                                                                annotationTable,
                                                                setAnnotationTable
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontSize: "1.2rem",
                                                        zIndex: 0,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <input
                                                        type="text"
                                                        value={row.operation}
                                                        onChange={(e) =>
                                                            handleEditInputChange(
                                                                e,
                                                                "operation",
                                                                index,
                                                                annotationTable,
                                                                setAnnotationTable
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontSize: "1.2rem",
                                                        zIndex: 0,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <Button
                                                        onClick={() =>
                                                            handleEditSave(
                                                                index,
                                                                setEditRowIndex,
                                                                annotationTable,
                                                                setAnnotationTable,
                                                                swaggerData,
                                                                setSwaggerData
                                                            )
                                                        }
                                                    >
                                                        {" "}
                                                        Save{" "}
                                                    </Button>
                                                    <Button
                                                        onClick={(e) =>
                                                            handleEditCancel(
                                                                setEditRowIndex
                                                            )
                                                        }
                                                    >
                                                        Cancel{" "}
                                                    </Button>
                                                </TableCell>
                                            </>
                                        ) : (
                                            <>
                                                <TableCell
                                                    style={{
                                                        fontSize: "1.2rem",
                                                        zIndex: 0,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {row.endpoint}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontSize: "1.2rem",
                                                        zIndex: 0,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {row.method}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontSize: "1.2rem",
                                                        zIndex: 0,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {row.service}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontSize: "1.2rem",
                                                        zIndex: 0,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {row.operation}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontSize: "1.2rem",
                                                        zIndex: 0,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <Button
                                                        onClick={() =>
                                                            handleEdit(
                                                                index,
                                                                setEditRowIndex
                                                            )
                                                        }
                                                    >
                                                        <Edit />
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            handleDelete(
                                                                index,
                                                                annotationTable,
                                                                swaggerData,
                                                                setAnnotationTable,
                                                                setSwaggerData
                                                            )
                                                        }
                                                    >
                                                        <Delete />
                                                    </Button>
                                                </TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div
                        style={{
                            marginTop: "auto",
                            marginBottom: "2rem",
                            display: "flex",
                            justifyContent: "center",
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
                            onClick={() => handleDownload(swaggerData)}
                        >
                            Download
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddAnnotations;
