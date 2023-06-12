import Form from "@rjsf/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import css from "./GridComponent.css";

const GridComponent = () => {
  const [formData, setFormData] = useState([]);
  const [searchGrid, setSearchGrid] = useState([]);
  //   console.log(searchGrid);
  const searchBox = require("../jsonFiles/searchBox.json");
  //const formData = require("../jsonFiles/formData.json");

  console.log(formData.Search);
  //const uiSchema = require("../jsonFiles/uiSchema.json");
  const handleSubmit = () => {
    const response = axios
      .get(
        `https://localhost:7031/api/GridData/search?searchText=${formData.Search}`
      )
      .then((res) => {
        console.log(res.data);
        setSearchGrid(res.data);
        // if (res && res.data) {
        //   //   props = res.data;
        //   console.log(res.data);
        //   setSearchGrid(res.data);
        //   //   return res.data;
        //   //   return props;
        // } else return [];
      })
      .catch((error) => {
        return error;
      });
    return response;
  };

  console.log(searchGrid);
  //   useEffect(async () => {
  //     setSearchGrid(await handleSubmit());
  //   }, []);
  // console.log(Object.key(searchGrid));

  
  const CustomFieldTemplate = (props) => {
    const [getAPIData, setAPIData] = useState([]);
    const getGridData = async () => {
      const response = await axios
        .get(`https://gorest.co.in/public/v2/comments`)
        .then((res) => {
          if (res && res.data) {
            props = res.data;
            console.log(props);
            //setAPIData(props);
            return props;
            // return res.data;
          } else return [];
        })
        .catch((error) => {
          return error;
        });
      return response;
    };

    useEffect(async () => {
      setAPIData(await getGridData());
    }, []);

    console.log(getAPIData);

    return (
      <div className={"gridData"}>
        <div className={"gridColumns"}>
          {getAPIData.length > 0 &&
            Object.keys(getAPIData[0]).map((key, id) => {
              {
                // console.log(key);
                // console.log(id);
                return (
                  <div className={"gridColumnHeadingItem"} htmlFor={id}>
                    {key}
                  </div>
                );
              }
            })}
          {/* {getAPIData.length > 0 &&
            Object.keys(getAPIData[0]).map((key, id) => {
              {
                // console.log(key);
                // console.log(id);
                return (
                  <div className={"gridColumnHeadingItem"} htmlFor={id}>
                    {key}
                  </div>
                );
              }
            })} */}
        </div>
        <div className={"gridDataAPI"}>
          {searchGrid.length
            ? Object.keys(searchGrid).map((key, index) => {
                {
                  return (
                    <div className={"apiGridRow"} key={index}>
                      {Object.keys(searchGrid[key]).map((ind) => {
                        return (
                          <div className={"apiGridItems"}>
                            {searchGrid[key][ind]}
                          </div>
                        );
                      })}
                    </div>
                  );
                }
              })
            : getAPIData.length &&
              Object.keys(getAPIData).map((key, index) => {
                {
                  return (
                    <div className={"apiGridRow"} key={index}>
                      {Object.keys(getAPIData[key]).map((ind) => {
                        return (
                          <div className={"apiGridItems"}>
                            {getAPIData[key][ind]}
                          </div>
                        );
                      })}
                    </div>
                  );
                }
              })}
        </div>
      </div>
    );
  };

  const uiSchema = {
    "ui:FieldTemplate": CustomFieldTemplate,
  };

  return (
    <div className="formRendering">
      {/* <Form schema={schema} FieldTemplate={CustomFieldTemplate} /> */}

      <Form
        schema={searchBox}
        //uiSchema={uiSchema}

        ArrayFieldTemplate={CustomFieldTemplate}
        formData={formData}
        onChange={(e) => {
          setFormData(e.formData);
        }}
        onSubmit={(e) => handleSubmit()}
      />
    </div>
  );
};

export default GridComponent;
