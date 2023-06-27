import Form from "@rjsf/core";

import React, { useEffect, useState } from "react";

import axios from "axios";

import "./GridComponent.css";
import { Edit } from "@mui/icons-material";

const GridComponent = (lowercaseAnnotation) => {
  const [formData, setFormData] = useState([]);

  const [searchGrid, setSearchGrid] = useState([]);

  const [getAPIData, setAPIData] = useState([]);

  const uischema = require("../jsonFiles/uiSchema.json");

  const searchBox = require("../jsonFiles/searchBox.json");
const [showformbutton, setshowformbutton] = useState(false)

  const handleSubmit = () => {
    console.log(formData);

    console.log(formData.Search);

    console.log(formData.Comment);

    const valueGridData = searchBox.custom.split(",");

    const valueCustomGridData = valueGridData[0].split("'");

    const getSearchData = valueCustomGridData[1] + formData.Search;

    console.log(searchBox.properties.Search.key);

    console.log(getSearchData);

    if (formData.Search) {
      axios

        .get(getSearchData)

        .then((res) => {
          if (res && res.data) {
            setSearchGrid(res.data);

            console.log(res.data);

            setAPIData(res.data);

            // console.log(formData.Search);

            console.log(searchGrid);

            return res.data;
          } else return [];
        })

        .catch((error) => {
          return error;
        });
    }
  };

  console.log(searchGrid);

  console.log(getAPIData);

  const [newApiState, setNewApiState] = useState([]);

  const getGridData = () => {
    axios

      .get(`https://localhost:7184/api/Customers/Customers`)

      .then((res) => {
        if (res && res.data) {
          // props = res.data;

          console.log(res.data);

          setAPIData(res.data);

          setNewApiState(res.data);

          // return props;
        } else return [];
      })

      .catch((error) => {
        return error;
      });

    //   return response;
  };

  // getGridData();

  const handleEditClick = (apiGridItems) => {
    localStorage.setItem("editData", JSON.stringify(apiGridItems));
  };

  useEffect(() => {
    !newApiState.length && getGridData();
  }, []);

  console.log(newApiState);

  console.log(getAPIData);

  // const fields = {

  //   SchemaField: CustomSchemaField,

  // };
  console.log(lowercaseAnnotation);
  const annotation=lowercaseAnnotation.lowercaseAnnotation;
  console.log(annotation);
useEffect(() => {
  if(annotation.includes("update")){
    setshowformbutton(true)
  }
}, [lowercaseAnnotation])

console.log(showformbutton);

  return (
    <div>
      <div className={"gridData"}>
        <div className={"gridColumns"}>
        <div className={"gridColumnHeadingItem"} >
                Actions
              </div>
          {getAPIData &&
            getAPIData.length > 0 &&
            Object.keys(getAPIData[0]).map((key, id) => {
              console.log(Object.keys(getAPIData[0]));

              console.log(key);

              return (         
                <div className={"gridColumnHeadingItem"} htmlFor={id}>
                  {key}
                </div>               
              );
            })}
        </div>

        <div className={"gridDataAPI"}>
      
          {getAPIData.length > 0 &&
            Object.keys(getAPIData).map((key, index) => {
              console.log(getAPIData);

              return (
                <div className={"apiGridRow"} key={index}>
                    <div className={"apiGridItems"}>
                        <Edit  onClick={() => handleEditClick(getAPIData[key])}/>
                      </div>
                  {Object.keys(getAPIData[key]).map((ind) => {
                    return (                   
                      <div className={"apiGridItems"}>
                        {getAPIData[key][ind]}
                      </div>                    
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>

{!showformbutton &&
      <Form
        schema={searchBox}
        uiSchema={uischema}
        formData={formData}
        // fields={fields}

        idPrefix={"rjsf_prefix"}
        onChange={(e) => {
          setFormData(e.formData);

          console.log(formData);

          console.log(formData.Search);
        }}
        onSubmit={(e) => handleSubmit()}
      />
}
    </div>
  );
};

export default GridComponent;
