import Form from "@rjsf/core";
import React, { useState } from "react";
import axios from "axios";

const ApplicationFormComponent = () => {
  const [formData, setformData] = useState([]);
  const applicationForm = require("../jsonFiles/applicationForm.json");
  const uiApplicationForm = require("../jsonFiles/uiApplicationForm.json");
  // const customAPI = applicationForm.custom;
  // console.log(applicationForm);
  // console.log(customAPI);
  // const PostApi = async (formData) => {
  //   const valuesFromCustomKeyInJSON = applicationForm.custom.split("'");
  //   console.log(valuesFromCustomKeyInJSON);
  //   console.log(valuesFromCustomKeyInJSON[1]);
  //   console.log(valuesFromCustomKeyInJSON[3]);
  //   const valueCustomGridData = valuesFromCustomKeyInJSON[1];
  //   const getSearchData = valueCustomGridData;
  //   console.log(getSearchData);
  //   console.log(formData);
  //   console.log("HIII");
  //   const baseURL = getSearchData;
  //   if (valuesFromCustomKeyInJSON[3] === "POST") {
  //     const response = await axios
  //       .post(baseURL, formData)
  //       .then((res) => {
  //         console.log("Hellllooo");
  //         alert("added successfully!!");
  //         return res;
  //       })
  //       .catch((error) => {
  //         return error;
  //       });
  //     return response;
  //   }
  // };

  // let x = {
  //   custom: customAPI,
  // };
  // console.log(x.custom);

  const handleSubmit = () => {
    console.log(formData);
    // PostApi(formData);
  };

  return (
    <div>
      <div className="form">
        <Form
          schema={applicationForm}
          uiSchema={uiApplicationForm}
          formData={formData}
          // uiSchema={uiSearchBox}
          onChange={(e) => {
            setformData(e.formData);
            console.log(formData);
            console.log("Hii");
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ApplicationFormComponent;
