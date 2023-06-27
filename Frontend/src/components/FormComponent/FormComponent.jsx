import Form from "@rjsf/core";
import React, { useState } from "react";
import "./FormComponent.css";
import axios from "axios";

const FormComponent = ({ jsonData, editData }) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const customerId = editData.customerId;

        const requestOptions = {
            method: "PUT",
            body: JSON.stringify(Object.fromEntries(formData)),
        };

        const apiUrl = `https://localhost:7184/api/Customers/Customers/${customerId}`;

        axios
            .put(apiUrl, requestOptions.body)
            .then((response) => {
                console.log(response.data);
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
