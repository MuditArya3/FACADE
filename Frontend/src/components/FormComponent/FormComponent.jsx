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
    const shouldRunEffectRef = useRef(false);
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

    useEffect(() => {
        if (csvData.length > 0) {
            csvData.forEach((item) => {
                const property = item.Properties;
                const action = item.Action;
                const field = item.Field;

                if (mappings.hasOwnProperty("phoneNumber2")) {
                    const fieldValue = formData[property];
                    if (fieldValue && field) {
                        if (action === "SHOW") {
                            const newSchema = {
                                ...schema,
                                properties: {
                                    ...schema.properties,
                                    [field]: {
                                        key: field,
                                        title: field,
                                        type: "string",
                                    },
                                },
                            };
                            setSchema(newSchema);
                            setMappings((prevdata) => ({
                                ...prevdata,
                                address3: [field],
                            }));

                            setFormData((prevFormData) => ({
                                ...prevFormData,
                                [field]: "",
                            }));
                        }
                    }
                } else if (mappings.hasOwnProperty("address3")) {
                    const fieldValue = formData[property];
                    console.log(formData[property]);
                    if (fieldValue && field) {
                        if (action === "HIDE") {
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
                        }
                    }
                }
            });
        }
    }, [csvData, formData, mappings]);

    useEffect(() => {
        shouldRunEffectRef.current = true;
    }, [formData]);

    // useEffect(() => {
    //     if (csvData.length > 0) {
    //         const showAddressAction = csvData.find(
    //             (item) =>
    //                 item.Action === "SHOW" &&
    //                 item.Properties === "phoneNumber" &&
    //                 item.Field === "address"
    //         );

    //         if (showAddressAction) {
    //             if (showAddressAction.Properties === mappings.phoneNumber2[0]) {
    //                 const addressProperty =
    //                     showAddressAction.Action.split(" ")[1].toLowerCase();
    //                 const newSchema1 = {
    //                     ...schema1,
    //                     properties: {
    //                         ...schema1.properties,
    //                         [addressProperty]: {
    //                             key: addressProperty,
    //                             title: "Address",
    //                             type: "string",
    //                         },
    //                     },
    //                 };
    //                 setFormData((prevFormData) => ({
    //                     ...prevFormData,
    //                     [addressProperty]: "",
    //                 }));
    //                 setMappings((prevdata) => ({
    //                     ...prevdata,
    //                     address3: [addressProperty],
    //                 }));
    //                 setSchema(newSchema1);
    //             }
    //         }
    //     }
    // }, [csvData]);

    console.log(schema);
    console.log(formData);

    const handleFormChange = (e) => {
        setFormData((prevData) => ({ ...prevData, ...e.formData }));
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
