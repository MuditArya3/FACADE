import Form from "@rjsf/core";
import React, { useState ,useEffect} from "react";
import "./FormComponent.css";
import Papa from "papaparse";
import { getDesiredValue, handleSubmit } from "./FormComponent";

const FormComponent = ({
    jsonData,
    selecteddata,
    setAPIData,
    showform,
    setshowform,
    submitText,
    showformbutton,
}) => {
    const [csvData, setcsvData] = useState([]);

    let schema1 = JSON.parse(localStorage.getItem("jsonSchema"));
    console.log(schema1);
    // console.log(schema);
    const uiSchema = require("../../jsonFiles/uiSchema.json");
    uiSchema["ui:options"]["submitButtonOptions"]["submitText"] =
        submitText || "Submit";
        const handleFileUpload = (e) => {
            const file = e.target.files[0];
            Papa.parse(file, {
              header: true,
              complete: (results) => {
                setcsvData(results.data);
              },
            });
          };
         let x={};
          useEffect(() => {
            console.log(csvData);
            // csvFileData();
            csvData.map((head) => {
              console.log(head);
              if (head && head.Validations) {
                console.log(head.Validations);
                if (head.Validations.includes("IS GREATER TO")) {
                  console.log("hello");
                  let abc = head.Validations;
                  x= getDesiredValue(abc)
                  console.log(x);
                  console.log(abc);
                }
              }
            });
          }, [csvData]);
    return (
        <div>
     
            <div className="form">
            <input type="file" accept=".csv" onChange={handleFileUpload}  />
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
