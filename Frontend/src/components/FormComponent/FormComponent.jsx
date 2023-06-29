import Form from "@rjsf/core";
import React, { useState } from "react";
import "./FormComponent.css";
import axios from "axios";
import { baseURL } from "../../AppSettings.js";

const FormComponent = ({ jsonData, selecteddata }) => {
    const handleSubmit = (e) => {
        const formData = e.formData;
        console.log(formData);
        const customerId = selecteddata.customerId;

        const apiUrl = `${baseURL}/api/Customers/Customers/${customerId}`;
        axios
            .put(apiUrl, formData)
            .then(() => {
                alert("Updated successfully");
            })
            .catch((error) => {
                console.error(error);
            });
    };
    //const [formData, setformData] = useState([]);

    //let schema = localStorage.getItem("jsonSchema");
    //const schema = require("../jsonFiles/schema.json");
    // const newData = require("../jsonFiles/searchBox.json");
    //const schema = jsonData;
    let schema1 = JSON.parse(localStorage.getItem("jsonSchema"));
    console.log(schema1);
    // console.log(schema);
    const uiSchema = require("../../jsonFiles/uiSchema.json");
    // const CustomSchemaField = function () {
    //   return (
    //     <div id="custom">
    //       <p>Yeah, I'm pretty dumb.</p>
    //       {/* <SchemaField {...props} /> */}
    //     </div>
    //   );
    // };
    // const CustomTitleField = ({ title, required }) => {
    //   //const legend = required ? title + "****" : title;
    //   return <div id="custom">legend</div>;
    // };
    // const fields = {
    //   TitleField: CustomTitleField,
    // };
    // const handleSubmit = () => {
    //   console.log(formData);
    // };
    return (
        <div>
            <div className="form">
                <Form
                    schema={schema1}
                    uiSchema={uiSchema}
                    // formData={formData}
                    // onChange={(e) => {
                    //   setformData(e.formData);
                    //   console.log("Hii");
                    //   console.log(formData);
                    // }}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default FormComponent;
