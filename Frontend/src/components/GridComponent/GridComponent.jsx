import Form from "@rjsf/core";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../GridComponent/GridComponent.css";
import { Edit, FolderZip } from "@mui/icons-material";
import FormComponent from "../FormComponent/FormComponent.jsx";
import { Container } from "@mui/system";
import { Accordion, AccordionDetails } from "@mui/material";
import { baseURL } from "../../AppSettings.js";
import { getGridData, handleData } from "./GridComponent.js";
import Papa from "papaparse";

const GridComponent = ({ lowercaseAnnotation, setJsonData, mappings }) => {
  const [csvData, setcsvData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [searchGrid, setSearchGrid] = useState([]);
  const [getAPIData, setAPIData] = useState([]);
  const uischema = require("../../jsonFiles/uiSchema.json");
  const searchBox = require("../../jsonFiles/searchBox.json");
  const [showformbutton, setshowformbutton] = useState(false);
  const [selecteddata, setselecteddata] = useState([]);
  const [showform, setshowform] = useState(false);
  const formRef = useRef(null);
  const [mappedGrid, setMappedGrid] = useState(false);
  const [newApiState, setNewApiState] = useState([]);

  console.log(mappings);
  Object.keys(mappings).map((m) => {
    console.log(m);
    const mapp = mappings[m].toString();
    console.log(mapp.toLowerCase());
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setcsvData(results.data);
      },
    });
  };
  let x = {};
  useEffect(() => {
    console.log(csvData);
    csvFileData();
    // csvData.map((head) => {
    //   console.log(head);
    //   if (head && head.Validations) {
    //     console.log(head.Validations);
    //     if (head.Validations.includes("IS GREATER TO")) {
    //       console.log("hello");
    //       let abc = head.Validations;
    //       x= getDesiredValue(abc)
    //       console.log(x);
    //       console.log(abc);
    //     }
    //   }
    // });
  }, [csvData]);

  const csvFileData = () => {
    const updatedData = getAPIData.map((obj) => {
      return { ...obj };
    });
    console.log(updatedData);
    console.log(getAPIData);
    console.log(csvData);
    csvData.length > 0 &&
      updatedData &&
      csvData.map((header) => {
        console.log(header);
        updatedData.map((row) => {
          console.log(row);
          if (`${row[header.ColumnName]}` === header.Value) {
            row[header.ColumnName] = header.Status;
          }
        });
      });
    //setAPIData((x) => [...x, ...updatedData]);
    setAPIData(updatedData);
  };

  useEffect(() => {
    !getAPIData.length && getGridData(setAPIData, setNewApiState);
  }, []);

  useEffect(() => {
    if (lowercaseAnnotation.includes("update")) {
      setshowformbutton(true);
    }
  }, [lowercaseAnnotation]);

  useEffect(() => {
    mappings && setMappedGrid(true);
  }, [mappings]);
  console.log(mappings);
  console.log(mappedGrid);

  console.log(searchGrid);
  console.log(getAPIData);

  console.log(baseURL);

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {!mappedGrid && (
        <div className={"gridData"}>
          <div className={"gridColumns"}>
            {showformbutton && (
              <div className={"gridColumnHeadingItem"} title="Actions">
                Actions
              </div>
            )}
            {getAPIData &&
              getAPIData.length > 0 &&
              Object.keys(getAPIData[0]).map((key, id) => {
                console.log(Object.keys(getAPIData[0]));
                console.log(key);
                return (
                  <div
                    className={"gridColumnHeadingItem"}
                    htmlFor={id}
                    title={key}
                  >
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
                    {showformbutton && (
                      <div className={"apiGridItems"}>
                        <Edit
                          onClick={() => {
                            handleData(
                              getAPIData[key],
                              setshowform,
                              setJsonData
                            );
                            setselecteddata(getAPIData[key]);
                          }}
                        />
                      </div>
                    )}
                    {Object.keys(getAPIData[key]).map((ind) => {
                      console.log(ind);
                      console.log(getAPIData[key][ind]);
                      return (
                        <div
                          className={"apiGridItems"}
                          title={getAPIData[key][ind]}
                        >
                          {getAPIData[key][ind]}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {mappedGrid && (
        <div className={"gridData"}>
          <div className={"gridColumns"}>
            {showformbutton && (
              <div className={"gridColumnHeadingItem"} title="Actions">
                Actions
              </div>
            )}

            {getAPIData.length > 0 &&
              Object.keys(mappings).map((m) => {
                // const mapp=mappings[m].toString();
                // console.log(mapp.toLowerCase());
                const mappingKey = mappings[m][0];
                const mapp = mappingKey.toLowerCase().trim();
                console.log(mappingKey);
                // const getdata=getAPIData.toString();

                console.log(getAPIData);
                return Object.keys(getAPIData[0]).map((data) => {
                  const getdata = data.toLowerCase();
                  console.log(data);
                  if (getdata === mapp) {
                    console.log("yesssssssssssss");
                    console.log(data, mappingKey);
                    return (
                      <div
                        key={mappingKey}
                        className="gridColumnHeadingItem"
                        title={mappingKey}
                      >
                        {mappingKey}
                      </div>
                    );
                  }
                });

                //   if (getAPIData[0].hasOwnProperty(mappingKey)) {
                //     return (
                //       <div
                //         key={mappingKey}
                //         className="gridColumnHeadingItem"
                //         title={mappingKey}
                //       >
                //         {mappingKey}
                //       </div>
                //     );
                //   }
                //   return null;
              })}

            {/* {getAPIData.length > 0 && Object.keys(mappings).map((m) => {
const mappingKey = mappings[m][0];
const mapp = mappingKey.toLowerCase();

if (Object.keys(getAPIData[0]).some((data) => data.toLowerCase() === mapp)) {
console.log("yesssssssssssss");
return (
<div key={mappingKey} className="gridColumnHeadingItem" title={mappingKey}>
{mappingKey}
</div>
);
}

 return null;
})} */}
          </div>
          <div className="gridDataAPI">
            {getAPIData.length > 0 &&
              Object.keys(getAPIData).map((key, index) => {
                return (
                  <div className="apiGridRow" key={index}>
                    {showformbutton && (
                      <div className="apiGridItems">
                        <Edit
                          onClick={() => {
                            handleData(
                              getAPIData[key],
                              setshowform,
                              setJsonData
                            );
                            setselecteddata(getAPIData[key]);
                          }}
                        />
                      </div>
                    )}
                    {Object.keys(mappings).map((m) => {
                      const mappingKey = mappings[m][0].trim();
                      const mapp = mappingKey.charAt(0).toLowerCase()+ mappingKey.substring(1);
                      console.log(mappingKey);
                      console.log(getAPIData[key]);
                      return Object.keys(getAPIData[key]).map((m)=>{
                        console.log(m);
                        const getdata=m;
                        if(getdata===mapp){
                          return (
                            <div
                              className="apiGridItems"
                              title={getAPIData[key][mapp]}
                              key={mappingKey}
                            >
                              {getAPIData[key][mapp]}
                            </div>
                          );
                        }
                      })




                      
                      // if (getAPIData[key].hasOwnProperty(mappingKey)) {
                      //   return (
                      //     <div
                      //       className="apiGridItems"
                      //       title={getAPIData[key][mappingKey]}
                      //       key={mappingKey}
                      //     >
                      //       {getAPIData[key][mappingKey]}
                      //     </div>
                      //   );
                      // }
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {!showformbutton && (
        <Form
          schema={searchBox}
          uiSchema={uischema}
          formData={formData}
          // fields={fields}
          idPrefix={"rjsf_prefix"}
          onChange={(e) => {
            setFormData(e.formData);
          }}
          //onSubmit={(e) => handleEdit()}
        />
      )}
      {showform && (
        <div ref={formRef}>
          <Container
            // style={{ background: '#f3e5f5' }}
            // {annotation.includes("create")?className="create" : className="get" }
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "Hidden",
              py: 4,
              // bgcolor: purple
            }}
          >
            <Accordion sx={{ width: "100%" }} expanded={true} Hidden={false}>
              <AccordionDetails sx={{ pt: 3 }}>
                <FormComponent
                  selecteddata={selecteddata}
                  setAPIData={setAPIData}
                  showform={showform}
                  setshowform={setshowform}
                  submitText={showformbutton ? "Update" : undefined}
                  showformbutton={showformbutton}
                />
              </AccordionDetails>
            </Accordion>
          </Container>
        </div>
      )}
    </div>
  );
};

export default GridComponent;
