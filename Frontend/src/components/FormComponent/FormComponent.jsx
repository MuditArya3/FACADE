import Form from "@rjsf/core";
import React, { useState } from "react";
import "./FormComponent.css";

import { handleSubmit } from "./FormComponent";

const FormComponent = ({
    jsonData,
    selecteddata,
    setAPIData,
    showform,
    setshowform,
    submitText,
    showformbutton,
}) => {
   
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
                    onSubmit={(e)=>{handleSubmit(e,showformbutton,selecteddata,setAPIData,setshowform,showform)}}
                />
            </div>
        </div>
    );
};

export default FormComponent;
