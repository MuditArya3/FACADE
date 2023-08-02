import Form from "@rjsf/core";
import React, { useState, useEffect, useRef } from "react";
import "./FormComponent.css";
import Papa from "papaparse";
import { getDesiredValue, handleSubmit } from "./FormComponent";
import { handleData } from "../MappingComponent/Mapping";

const FormComponent = ({
    jsonData,
    selecteddata,
    setAPIData,
    showform,
    setshowform,
    submitText,
    showformbutton,
    mappings,
    setMappings,
}) => {
    const [csvData, setcsvData] = useState([]);
    const [formData, setFormData] = useState({});
    const [fileUploaded, setFileUploaded] = useState(false);
    const [schema, setSchema] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    let schema1 = JSON.parse(localStorage.getItem("jsonSchema"));
    const uiSchema = require("../../jsonFiles/uiSchema.json");
    uiSchema["ui:options"]["submitButtonOptions"]["submitText"] =
        submitText || "Submit";

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                setcsvData(results.data);
                setFileUploaded(true);
                results.data.forEach((item) => {
                    const property = item.Properties;
                    const action = item.Action;
                    const field = item.Field;
                    const value = Object.values(mappings);

                    if (
                        value.some((valArr) => valArr.includes(field)) &&
                        value.some((valArr) => valArr.includes(property))
                    ) {
                        if (action === "SHOW") {
                            const fieldValue = formData[property];
                            console.log(fieldValue);
                            if (!fieldValue && field) {
                                console.log("file");
                                setSchema((prevSchema) => {
                                    const newSchema = { ...prevSchema };
                                    delete newSchema.properties[field];
                                    return newSchema;
                                });
                                setFormData((prevFormData) => {
                                    const newFormData = { ...prevFormData };
                                    delete newFormData[field];
                                    return newFormData;
                                });
                            }
                        }
                    }
                });
            },
        });
    };

    const handleFormSubmit = (e) => {
        csvData.forEach((item) => {
            const property = item.Properties;
            const action = item.Action;
            if (formData.hasOwnProperty(property)) {
                const value = formData[property];
                console.log(value);
                console.log(action);
                if (action === "10" && value && value.toString().length > 10) {
                    console.log("error");
                    setErrorMessage(
                        "Phone number should not exceed 10 digits."
                    );
                    return;
                } else {
                    //setErrorMessage("");
                    handleSubmit(
                        e,
                        showformbutton,
                        selecteddata,
                        setAPIData,
                        setshowform,
                        showform
                    );
                }
            }
        });
    };

    useEffect(() => {
        setSchema(schema1);
    }, []);

    console.log(formData);
    console.log(mappings);
    console.log(schema);

    const handleFormChange = (e) => {
        setFormData((prevData) => ({ ...prevData, ...e.formData }));

        if (csvData.length > 0) {
            csvData.forEach((item) => {
                const property = item.Properties;
                const action = item.Action;
                const field = item.Field;
                const value = Object.values(mappings);

                if (
                    value.some((valArr) => valArr.includes(field)) &&
                    value.some((valArr) => valArr.includes(property))
                ) {
                    const fieldValue = e.formData[property];
                    if (action === "SHOW") {
                        if (fieldValue && field) {
                            console.log("show");
                            setSchema((prevSchema) => {
                                const newSchema = {
                                    ...prevSchema,
                                    properties: {
                                        ...prevSchema.properties,
                                        [field]: {
                                            key: field,
                                            title: field,
                                            type: "string",
                                        },
                                    },
                                };
                                return newSchema;
                            });
                            // setMappings((prevdata) => ({
                            //     ...prevdata,
                            //     [field]: [field],
                            // }));
                            // setFormData((prevFormData) => ({
                            //     ...prevFormData,
                            //     [field]: "",
                            // }));
                        } else if (fieldValue === undefined && field) {
                            console.log("hide");
                            setSchema((prevSchema) => {
                                const newSchema = { ...prevSchema };
                                delete newSchema.properties[field];
                                return newSchema;
                            });
                            // setMappings((prevMappings) => {
                            //     const newMappings = { ...prevMappings };
                            //     delete newMappings[property];
                            //     return newMappings;
                            // });
                            setFormData((prevFormData) => {
                                const newFormData = { ...prevFormData };
                                delete newFormData[field];
                                return newFormData;
                            });
                        }
                    } else if (action === "HIDE") {
                        if (fieldValue && field) {
                            console.log("hide  hide");
                            setMappings((prevMappings) => {
                                const newMappings = { ...prevMappings };
                                delete newMappings[property];
                                return newMappings;
                            });
                            setSchema((prevSchema) => {
                                const newSchema = { ...prevSchema };
                                delete newSchema.properties[field];
                                return newSchema;
                            });
                            setFormData((prevFormData) => {
                                const newFormData = { ...prevFormData };
                                delete newFormData[field];
                                return newFormData;
                            });
                        } else if (fieldValue === undefined && field) {
                            setMappings((prevdata) => ({
                                ...prevdata,
                                [field]: [field],
                            }));
                            setSchema((prevSchema) => {
                                const newSchema = {
                                    ...prevSchema,
                                    properties: {
                                        ...prevSchema.properties,
                                        [field]: {
                                            key: field,
                                            title: field,
                                            type: "string",
                                        },
                                    },
                                };
                                return newSchema;
                            });
                        }
                    }
                }
            });
        }
    };

    return (
        <div>
            <div className="form">
                <input type="file" accept=".csv" onChange={handleFileUpload} />
                {fileUploaded ? (
                    <Form
                        schema={schema}
                        uiSchema={uiSchema}
                        formData={formData}
                        onChange={handleFormChange}
                        onSubmit={handleFormSubmit}
                    />
                ) : (
                    <Form
                        schema={schema1}
                        uiSchema={uiSchema}
                        formData={formData}
                        onChange={handleFormChange}
                        onSubmit={(e) => {
                            handleSubmit(
                                e,
                                showformbutton,
                                selecteddata,
                                setAPIData,
                                setshowform,
                                showform
                            );
                        }}
                    />
                )}
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default FormComponent;
