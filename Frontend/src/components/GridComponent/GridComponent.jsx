import Form from "@rjsf/core";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../GridComponent/GridComponent.css";
import { Edit, FolderZip } from "@mui/icons-material";
// import { handleData } from "../SwaggerGrid/SwaggerGrid";
import FormComponent from "../FormComponent/FormComponent";
import { Container } from "@mui/system";
import { Accordion, AccordionDetails } from "@mui/material";
import { baseURL } from "../../AppSettings.js";
import { getGridData ,handleData} from "./GridComponent";

const GridComponent = ({ lowercaseAnnotation, setJsonData ,mappings}) => {
  const [formData, setFormData] = useState([]);
  const [searchGrid, setSearchGrid] = useState([]);
  const [getAPIData, setAPIData] = useState([]);
  const uischema = require("../../jsonFiles/uiSchema.json");
  const searchBox = require("../../jsonFiles/searchBox.json");
  const [showformbutton, setshowformbutton] = useState(false);
  const [selecteddata, setselecteddata] = useState([]);
  const [showform, setshowform] = useState(false);
  const formRef = useRef(null);
  const [mappedGrid, setMappedGrid] = useState(false)
  const [newApiState, setNewApiState] = useState([]);
  

  useEffect(() => {
    !getAPIData.length && getGridData(setAPIData,setNewApiState);
  }, []);

  useEffect(() => {
    if (lowercaseAnnotation.includes("update")) {
      setshowformbutton(true);
    }
  }, [lowercaseAnnotation]);

  useEffect(() => {
    mappings &&
      setMappedGrid(true);
  }, [mappings])
  console.log(mappings);
  console.log(mappedGrid);

  console.log(searchGrid);
  console.log(getAPIData);

  console.log(baseURL);
  

 
  return (
    <div>
      {!mappedGrid &&<div className={"gridData"}>
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
                          handleData(getAPIData[key],setshowform,setJsonData);
                          setselecteddata(getAPIData[key]);
                        }}
                      />
                    </div>
                  )}
                  {Object.keys(getAPIData[key]).map((ind) => {
                    console.log(ind);
                    return (
                      <div
                        className={"apiGridItems"}
                        title={getAPIData[key][ind]}
                      >
                        {getAPIData[key][ind]}
                        {/* {ind === "alive" &&
                          (getAPIData[key][ind] === 1 ? (
                            <div
                              style={{
                                width: "60px",
                                height: "20px",
                                backgroundColor: "green",
                                marginLeft: "10px",
                                borderRadius: "30px",
                                color:"white"
                              }}
                            >Online</div>
                          ) : (
                            <div
                              style={{
                                width: "60px",
                                height: "20px",
                                backgroundColor: "red",
                                marginLeft: "10px",
                                borderRadius: "30px",
                              }}
                            >Offline</div>
                          ))}
                        {ind === "antivirus" &&
                          (getAPIData[key][ind] === 1 ? (
                            <div> Running</div>
                          ) : getAPIData[key][ind] === 0 ? (
                            <div> Inactive</div>
                          ) : getAPIData[key][ind] === 2 ?(
                            <div>Not Instlled</div>
                          ):(
                            <div>Not Synced</div>
                          ))}
                           {ind === "diskSpace" &&
                          (getAPIData[key][ind] === 1 ? (
                            <div> Succeeds</div>
                          ) : getAPIData[key][ind] === 0 ? (
                            <div> Inactive</div>
                          ) : (
                            <div>Exceeds</div>
                          ))}
                          {ind === "smartDisk" &&
                          (getAPIData[key][ind] === 1 ? (
                            <div>Active</div>
                          ) : getAPIData[key][ind] === 0 ? (
                            <div> Inactive</div>
                          ) : getAPIData[key][ind] === 2 ?(
                            <div>Offline</div>
                          ):(
                            <div>No Info</div>
                          ))}
                          {ind === "amt" &&
                          (getAPIData[key][ind] === 1 ? (
                            <div> Not Activated</div>
                          ) : getAPIData[key][ind] === 0 ? (
                            <div> Not Configured</div>
                          ) : (
                            <div>Compliant</div>
                          ))}
                        {ind !== "alive" &&
                          ind !== "antivirus" &&
                          ind !== "diskSpace" &&
                          ind !== "smartDisk" &&
                          ind !== "amt" &&
                          getAPIData[key][ind]} */}
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>}
      {mappedGrid &&
     <div className={"gridData"}>
     <div className={"gridColumns"}>
       {showformbutton && (
         <div className={"gridColumnHeadingItem"} title="Actions">
           Actions
         </div>
       )}

       {getAPIData.length > 0 &&
         Object.keys(mappings).map((m) => {
           const mappingKey = mappings[m][0];
           if (getAPIData[0].hasOwnProperty(mappingKey)) {
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
           return null;
         })}
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
                       handleData(getAPIData[key],setshowform,setJsonData);
                       setselecteddata(getAPIData[key]);
                     }}
                   />
                 </div>
               )}
               {Object.keys(mappings).map((m) => {
                 const mappingKey = mappings[m][0];
                 if (getAPIData[key].hasOwnProperty(mappingKey)) {
                   return (
                     <div
                       className="apiGridItems"
                       title={getAPIData[key][mappingKey]}
                       key={mappingKey}
                     >
                       {getAPIData[key][mappingKey]}
                     </div>
                   );
                 }
               })}
             </div>
           );
         })}
     </div>
   </div>}

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
                <FormComponent selecteddata={selecteddata} setAPIData={setAPIData} showform={showform} setshowform={setshowform}
                submitText={showformbutton ? "Update" : undefined}
                showformbutton={showformbutton} />
              </AccordionDetails>
            </Accordion>
          </Container>
        </div>
      )}
    </div>
  );
};

export default GridComponent;
