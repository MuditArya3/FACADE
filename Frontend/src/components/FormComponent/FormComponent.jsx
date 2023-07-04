import Form from "@rjsf/core";
import React, { useState } from "react";
import "./FormComponent.css";
import axios from "axios";

const FormComponent = ({
    jsonData,
    selecteddata,
    setAPIData,
    showform,
    setshowform,
    submitText,
    showformbutton,
}) => {
    const handleSubmit = (e) => {
        if (showformbutton) {
            const formData = e.formData;
            console.log(formData);
            const customerId = selecteddata.customerId;

            const apiUrl = `https://localhost:7184/api/Customers/Customers/${customerId}`;
            axios
                .put(apiUrl, formData)
                .then(() => {
                    alert("Updated successfully");

                    setAPIData((prevData) => {
                        const updatedData = prevData.map((item) => {
                            if (item.customerId === customerId) {
                                return { ...item, ...formData };
                            }
                            return item;
                        });
                        return updatedData;
                    });
                    setshowform(!showform);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    let schema1 = JSON.parse(localStorage.getItem("jsonSchema"));
    console.log(schema1);
    // console.log(schema);
    const uiSchema = require("../../jsonFiles/uiSchema.json");
    uiSchema["ui:options"]["submitButtonOptions"]["submitText"] =
        submitText || "Submit";

    return (
        <div>
            <div className="form">
                <Form
                    schema={schema1}
                    uiSchema={uiSchema}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default FormComponent;
