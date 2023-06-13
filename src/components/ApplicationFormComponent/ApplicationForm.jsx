// import Form from "@rjsf/core";
// import React, { useState } from "react";
// import axios from "axios";

// const ApplicationFormComponent = () => {
//   const [formData, setformData] = useState([]);
//   const applicationForm = require("../../jsonFiles/applicationForm.json");
//   const uiApplicationForm = require("../../jsonFiles/uiApplicationForm.json");
//   // const customAPI = applicationForm.custom;
//   // console.log(applicationForm);
//   // console.log(customAPI);
//   // const PostApi = async (formData) => {
//   //   const valuesFromCustomKeyInJSON = applicationForm.custom.split("'");
//   //   console.log(valuesFromCustomKeyInJSON);
//   //   console.log(valuesFromCustomKeyInJSON[1]);
//   //   console.log(valuesFromCustomKeyInJSON[3]);
//   //   const valueCustomGridData = valuesFromCustomKeyInJSON[1];
//   //   const getSearchData = valueCustomGridData;
//   //   console.log(getSearchData);
//   //   console.log(formData);
//   //   console.log("HIII");
//   //   const baseURL = getSearchData;
//   //   if (valuesFromCustomKeyInJSON[3] === "POST") {
//   //     const response = await axios
//   //       .post(baseURL, formData)
//   //       .then((res) => {
//   //         console.log("Hellllooo");
//   //         alert("added successfully!!");
//   //         return res;
//   //       })
//   //       .catch((error) => {
//   //         return error;
//   //       });
//   //     return response;
//   //   }
//   // };

//   // let x = {
//   //   custom: customAPI,
//   // };
//   // console.log(x.custom);

//   const handleSubmit = () => {
//     console.log(formData);
//     // PostApi(formData);
//   };

//   return (
//     <div>
//       <div className="form">
//         <Form
//           schema={applicationForm}
//           uiSchema={uiApplicationForm}
//           formData={formData}
//           // uiSchema={uiSearchBox}
//           onChange={(e) => {
//             setformData(e.formData);
//             console.log(formData);
//             console.log("Hii");
//           }}
//           onSubmit={handleSubmit}
//         />
//       </div>
//     </div>
//   );
// };

// export default ApplicationFormComponent;

import Form from "@rjsf/core";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const ApplicationFormComponent = () => {
  // const [formData, setformData] = useState([]);
  // const applicationForm = require("../../jsonFiles/applicationForm.json");
  // const uiApplicationForm = require("../../jsonFiles/uiApplicationForm.json");
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

  // const handleSubmit = () => {
  //   console.log(formData);
  //   // PostApi(formData);
  // };

  return (
    <div>
      <div
        className="form"
        title="Hi shreesh Dutta bajpai"
        aria-label="Hi shreesh Dutta bajpai"
      >
        {/* <Form
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
        /> */}
        <svg width="100" height="100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="green"
            stroke-width="4"
            fill="yellow"
          />
        </svg>
      </div>
    </div>
  );
};

export default ApplicationFormComponent;
