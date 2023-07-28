import Form from "@rjsf/core";
import React, { useState, useEffect } from "react";
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
            },
        });
    };

    const handleFormSubmit = (e) => {
        const phoneNumberValidation = csvData.find(
            (item) =>
                item.Properties === "phoneNumber" &&
                item.Action === "NOT GREATER THAN 10"
        );
        console.log(formData.phoneNumber.toString().length);

        if (
            phoneNumberValidation &&
            formData.phoneNumber &&
            formData.phoneNumber.toString().length > 10
        ) {
            setErrorMessage("Phone number should not exceed 10 digits.");
            alert("wrong");

            return;
        }

        setErrorMessage("");

        handleSubmit(
            e,
            showformbutton,
            selecteddata,
            setAPIData,
            setshowform,
            showform
        );
    };
    useEffect(() => {
        if (csvData.length > 0) {
            const showAddressAction = csvData.find(
                (item) =>
                    item.Action === "SHOW ADDRESS" &&
                    item.Properties === "phoneNumber"
            );

            if (showAddressAction && mappings.hasOwnProperty("phoneNumber")) {
                if (showAddressAction.Properties === mappings.phoneNumber2[0]) {
                    const addressProperty =
                        showAddressAction.Action.split(" ")[1].toLowerCase();
                    const newSchema1 = {
                        ...schema1,
                        properties: {
                            ...schema1.properties,
                            [addressProperty]: {
                                key: addressProperty,
                                title: "Address",
                                type: "string",
                            },
                        },
                    };
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        [addressProperty]: "",
                    }));
                    setMappings((prevdata) => ({
                        ...prevdata,
                        address3: [addressProperty],
                    }));
                    setSchema(newSchema1);
                }
            }
            setSchema(schema1);
        }
    }, [csvData]);

    console.log(schema);

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
