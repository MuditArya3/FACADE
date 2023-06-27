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
    const valueGridData = searchBox.custom.split(",");
    const valueCustomGridData = valueGridData[0].split("'");
    const getSearchData = valueCustomGridData[1] + formData.Search;
   
    if (formData.Search) {
      axios
        .get(getSearchData)
        .then((res) => {
          if (res && res.data) {
            setSearchGrid(res.data);
            console.log(res.data);
            setAPIData(res.data);
            return res.data;
          } else return [];
        })
        .catch((error) => {
          return error;
        });
    }
  };

  const [newApiState, setNewApiState] = useState([]);

  const getGridData = () => {
    axios
      .get(`https://localhost:7184/api/Customers/Customers`)
      .then((res) => {
        if (res && res.data) {
          setAPIData(res.data);
          setNewApiState(res.data);
        } else return [];
      })
      .catch((error) => {
        return error;
      });
  };

  const handleEditClick = (apiGridItems) => {
    localStorage.setItem("editData", JSON.stringify(apiGridItems));
  };

  useEffect(() => {
    !newApiState.length && getGridData();
  }, []);

  const annotation=lowercaseAnnotation.lowercaseAnnotation;

useEffect(() => {
  if(annotation.includes("update")){
    setshowformbutton(true)
  }
}, [lowercaseAnnotation])

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
        idPrefix={"rjsf_prefix"}
        onChange={(e) => {
          setFormData(e.formData);
        }}
        onSubmit={(e) => handleSubmit()}
      />
}
    </div>
  );
};

export default GridComponent;
