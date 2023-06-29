import Form from "@rjsf/core";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../GridComponent/GridComponent.css";
import { Edit, FolderZip } from "@mui/icons-material";
import { handleData } from "../SwaggerGrid/SwaggerGrid";
import FormComponent from "../FormComponent/FormComponent";
import { Container } from "@mui/system";
import { Accordion, AccordionDetails } from "@mui/material";

const GridComponent = ({ lowercaseAnnotation, setJsonData }) => {
  const [formData, setFormData] = useState([]);
  const [searchGrid, setSearchGrid] = useState([]);
  const [getAPIData, setAPIData] = useState([]);
  const uischema = require("../../jsonFiles/uiSchema.json");
  const searchBox = require("../../jsonFiles/searchBox.json");
  const [showformbutton, setshowformbutton] = useState(false);
  const [selecteddata, setselecteddata] = useState([]);
  const [showform, setshowform] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (showform && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [showform]);

  useEffect(() => {
    !getAPIData.length && getGridData();
  }, []);

  useEffect(() => {
    if (lowercaseAnnotation.includes("update")) {
      setshowformbutton(true);
    }
  }, [lowercaseAnnotation]);


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
 
  const handleData = (selecteddata) => {
    //   localStorage.setItem("ColumnData", JSON.stringify(columns));
    let requiredFields;
    let uu = {};
    let layout = {};
    Object.keys(selecteddata).map((rcol) => {
      console.log(rcol);
      console.log(selecteddata[rcol]);
      layout = {
        key: rcol,
        title: rcol,
        type: typeof selecteddata[rcol]=== "number" ? "integer" : typeof selecteddata[rcol],
        default: selecteddata[rcol],
      };
      uu[rcol] = { ...layout };
    });

    console.log(uu);

    let x = `fetch('https://yrzoud88dh5x80f4266.simplifycloudlab.com/v4_6_release/apis/3.0/service/tickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization':'Basic cGVubWFuYWdlKzhldDRWUVZZb0taQ1hMeTQ6NUdNc0h3OVNZdEV0RTI5Zw==',
            'clientId':'f9163e2b-a465-46e4-8f42-0a193c68ee9c',
        },
        body:JSON.stringify({})
      }).then(function (response) {
      console.log(response,'gagan');
        if (response.ok) {
          return response.json();
        }
        //throw response;
      }).then(function (data) {
        console.log(data);
      }).catch(function (error) {
        console.warn(error);
      });
      input: true,
      `;

    uu["custom"] = x;
    setshowform(true);
    //   if (buttonClicked === "SaveMapping") {
    // window.open("/form", "_blank");
    //   }
    handleSave(uu);
    // handleSave(
    //   uu,
    //   requiredFields,
    //   buttonClicked,
    //   setJsonData,
    //   setJsonfile,
    //   setButtonClicked
    // );
  };
  const handleSave = (
    data
    // requiredFields,
    // buttonClicked,
    // setJsonData,
    // setJsonfile,
    // setButtonClicked
  ) => {
    console.log(data);
    var json = Object.assign({}, data);
    console.log(json);
    handlecreatefile({
      label: "search",
      title: "JSON Form",
      // description: "Search using below Textbox",
      type: "object",
      // required: [requiredFields],
      properties: json,
    });
  };

  const handlecreatefile = (data) => {
    console.log(data);
    const json = JSON.stringify(data);

    // if (buttonClicked === "SaveMapping") {
    // setJsonfile(JSON.stringify(data));
    setJsonData(JSON.stringify(data));
    localStorage.setItem("jsonSchema", json);
  };
  

  return (
    <div>
      <div className={"gridData"}>
        <div className={"gridColumns"}>
          {showformbutton && <div className={"gridColumnHeadingItem"}>Actions</div>}
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
                  {showformbutton && <div className={"apiGridItems"}>
                    <Edit onClick={() => {handleData(getAPIData[key])
                    setselecteddata(getAPIData[key])}} />
                  </div>}
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
                submitText={showformbutton ? "Update" : undefined} />
              </AccordionDetails>
            </Accordion>
          </Container>
        </div>
      )}
    </div>
  );
};

export default GridComponent;
