import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";
import {
  handleAction,
  actionMethods,
  handleAccordionChange,
  handleApiMethodChange,
  handleResponse,
  handleFileSelectChange,
  getdesiredvalue,
  handleTableSwaggerSubmit,
  handleApiSelected,
} from "./JsonTemplate";
import { useState } from "react";
import "../JsonTemplateComponent/JsonTemplate.css";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useEffect } from "react";

const JsonTemplate = ({ jsonData, setJsonData }) => {
  const [mappings, setMappings] = useState({});
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const [selectApiMethod, setSelectApiMethod] = useState("");
  const [tableNames, setTableNames] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [swaggerData, setSwaggerData] = useState();
  const [columns, setColumns] = useState();
  const [options, setOptions] = useState(); // eslint-disable-next-line
  const [services, setServices] = useState("");
  const [apiMethods, setapiMethods] = useState([]); // eslint-disable-next-line
  const [response, setResponse] = useState([]);
  const [SelectedResponse, setSelectedResponse] = useState("");
  const [selected, setSelected] = useState({});
  const [jsonfile, setJsonfile] = useState([]);
  const [ApiData, setApiData] = useState();
  const [Actions, setActions] = useState();
  const [stateData, setStateData] = useState({});
  const [required, setRequired] = useState([]);
  const [buttonClicked, setButtonClicked] = useState();

  console.log(options);

  useEffect(() => {
    setTableNames(
      swaggerData
        ? // eslint-disable-next-line
          Object.keys(swaggerData.paths).map((item) => {
            Object.keys(swaggerData.paths[item]);
            // console.log(swaggerData.paths[item].selectApiMethod);
          })
        : []
    );
    // setTableNames(swaggerData.paths)
  }, [swaggerData]);

  useEffect(() => {
    console.log(selectedTable);
    swaggerData &&
      selectedTable &&
      setapiMethods(Object.keys(swaggerData.paths[selectedTable]));
  }, [swaggerData, selectedTable]);
  console.log(apiMethods);

  useEffect(() => {
    swaggerData &&
      selectedTable &&
      selectApiMethod &&
      setResponse(
        Object.keys(swaggerData.paths[selectedTable][selectApiMethod])
      );
  }, [swaggerData, selectedTable, apiMethods, selectApiMethod]);
  console.log(response);
//   useEffect(() => {
//     swaggerData&&
//     setSelectApiMethod("");
//     setSelectedResponse("")
//    }, [selectedTable ])
   
   useEffect(() => {
    swaggerData&&
    selectedTable.length&&
    selectApiMethod.length&&
    setColumns()
    setActions()
   }, [SelectedResponse])


  useEffect(() => {
    const filteredEndpoints = swaggerData
      ? Object.keys(swaggerData.paths).filter(() => {
          return swaggerData.paths;
        })
      : [];

    setTableNames(filteredEndpoints);
  }, [selectApiMethod, swaggerData]);

  console.log("swaggerData", swaggerData);

  console.log(swaggerData);

  //   const handleAccordionChange = () => {
  //     setExpandedAccordion(true);
  //   };

  //   const handleApiMethodChange = (e) => {
  //     setSelectApiMethod(e.target.value);
  //     console.log(selectApiMethod);
  //   };

  //   const handleResponse = (e) => {
  //     setSelectedResponse(e.target.value);
  //     console.log(SelectedResponse);
  //   };

  useEffect(() => {
    handleTableSwaggerSubmit(
      selectedTable,
      selectApiMethod,
      SelectedResponse,
      swaggerData,
      required,
      setColumns
    );
    handleAccordionChange(setExpandedAccordion);
  }, [SelectedResponse, required]);

  const handleData = (e) => {
    let requiredFields;
    let uu=[];
    console.log(Object.keys(swaggerData));
    if(Object.keys(swaggerData).includes("swagger")){
        console.log("hello");
        let apidatas=swaggerData.paths[selectedTable][selectApiMethod].responses;
        if(selectApiMethod==="get" || selectApiMethod==="put"){
            apidatas=apidatas["200"]["$ref"];
            console.log("get");
        }
        else if(selectApiMethod==="delete"){
            apidatas=apidatas["204"]["$ref"]
            console.log("delete");
        }
        else if(selectApiMethod==="post"){
            if(apidatas.includes("201")){
                apidatas=apidatas["201"]["$ref"]
                console.log("post");
            }else{
                apidatas=apidatas["200"]["$ref"]
                console.log("post");
            }
        }

        let requiredval= getdesiredvalue(apidatas);
        let apidata=swaggerData.responses[requiredval].schema["$ref"];

        const requiredval2=getdesiredvalue(apidata);
        const apidata1=swaggerData.definitions[requiredval2].properties;
        console.log(apidata1);
        let p = swaggerData.definitions[requiredval2];
        if (Object.keys(p).includes("required")) {
          // setRequiredFields(p.required);
          requiredFields = p.required;
        }
        console.log(requiredFields);
        setApiData(Object.keys(apidata1));
        Object.keys(apidata1).map((item) => {
            Object.keys(mappings).map((elem, index) => {
              console.log(item, mappings[elem][0]);
              if (mappings[elem][0] === item) {
                console.log(item);
                // console.log(Object.keys(apidata[item]));
                console.log(selected);
                let dd = () => {
                  let a = {};
                  let x = Object.keys(apidata1[item]);
                  console.log(x);
      
                  if (Object.keys(apidata1[item]).includes("data")) {
                    a = {
                      data: {
                        url: "",
                        headers: [
                          {
                            key: "",
                            value: "",
                          },
                        ],
                      },
                    };
                    a.title = item;
                    a.tableView = apidata[item].tableView;
                    a.dataSrc = apidata[item].dataSrc;
                    a.data.url = apidata[item].data.url;
                    console.log(a.data.url);
                    a.template = apidata[item].template;
                    a.noRefreshOnScroll = apidata[item].noRefreshOnScroll;
                    a.input = apidata[item].input;
                    a.selectValues = apidata[item].selectValues;
                    a.disableLimit = apidata[item].disableLimit;
                    a.valueProperty = apidata[item].valueProperty;
                    a.key = [item][0];
                    a.type = apidata[item].type;
                    a.widget = apidata1[item].widget;
                  } else if (Object.keys(apidata1[item]).includes("enum")) {
                    // a.source = apidata[item].enum;
      
                    a.title = item;
      
                    a.type = "string";
                    a.key = "select";
                    a.input = true;
      
                    a.enum = apidata1[item].enum;
                  } else if (Object.keys(apidata1[item]).includes("$ref")) {
                    a.type = "textfield";
                    a.ignore = "ref";
                    a.label = item;
                    a.key = item;
                  } else {
                    a.title = item;
                    if (apidata1[item].format === "int32") {
                      a.type = "integer";
                    } else if (apidata1[item].format === "double") {
                      a.type = "number";
                    } else {
                      a.type = "string";
                    }
                    if (apidata1[item].nullable) {
                      a.nullable = true;
                    }
                    if (apidata1[item].tableView) {
                      a.tableView = true;
                    }
      
                    a.key = [item][0];
                  }
                  return a;
                };
                console.log(dd());
                uu[item] = dd();
              }
            });
          });

    }else if(Object.keys(swaggerData).includes("openapi")){
        let apidatas;
        if (selectApiMethod === "post") {
          apidatas =
            swaggerData.paths[selectedTable][selectApiMethod].requestBody.content[
              "application/json"
            ].schema["$ref"];
        } else if (selectApiMethod === "get") {
          apidatas =
            swaggerData.paths[selectedTable][selectApiMethod].responses["200"]
              .content["application/vnd.connectwise.com+json; version=2022.1"]
              .schema.items["$ref"];
        }
    
        let requiredval = getdesiredvalue(apidatas);
        let apidata = swaggerData.components.schemas[requiredval].properties;
      
        let p = swaggerData.components.schemas[requiredval];
        if (Object.keys(p).includes("required")) {
          // setRequiredFields(p.required);
          requiredFields = p.required;
        }
        //   setRequired(requiredFields);
        console.log(requiredFields);
        console.log(required);
        console.log("swaggerData", Object.keys(apidata));
    
        setApiData(Object.keys(apidata));
        console.log(apidata);
       
    
        Object.keys(apidata).map((item) => {
          Object.keys(mappings).map((elem, index) => {
            console.log(item, mappings[elem][0]);
            if (mappings[elem][0] === item) {
              console.log(item);
              console.log(Object.keys(apidata[item]));
              console.log(selected);
              let dd = () => {
                let a = {};
                let x = Object.keys(apidata[item]);
                console.log(x);
    
                if (Object.keys(apidata[item]).includes("data")) {
                  a = {
                    data: {
                      url: "",
                      headers: [
                        {
                          key: "",
                          value: "",
                        },
                      ],
                    },
                  };
                  a.title = item;
                  a.tableView = apidata[item].tableView;
                  a.dataSrc = apidata[item].dataSrc;
                  a.data.url = apidata[item].data.url;
                  console.log(a.data.url);
                  a.template = apidata[item].template;
                  a.noRefreshOnScroll = apidata[item].noRefreshOnScroll;
                  a.input = apidata[item].input;
                  a.selectValues = apidata[item].selectValues;
                  a.disableLimit = apidata[item].disableLimit;
                  a.valueProperty = apidata[item].valueProperty;
                  a.key = [item][0];
                  a.type = apidata[item].type;
                  a.widget = apidata[item].widget;
                } else if (Object.keys(apidata[item]).includes("enum")) {
                  // a.source = apidata[item].enum;
    
                  a.title = item;
    
                  a.type = "string";
                  a.key = "select";
                  a.input = true;
    
                  a.enum = apidata[item].enum;
                } else if (Object.keys(apidata[item]).includes("$ref")) {
                  a.type = "textfield";
                  a.ignore = "ref";
                  a.label = item;
                  a.key = item;
                } else {
                  a.title = item;
                  if (apidata[item].format === "int32") {
                    a.type = "integer";
                  } else if (apidata[item].format === "double") {
                    a.type = "number";
                  } else {
                    a.type = "string";
                  }
                  if (apidata[item].nullable) {
                    a.nullable = true;
                  }
                  if (apidata[item].tableView) {
                    a.tableView = true;
                  }
    
                  a.key = [item][0];
                }
                return a;
              };
              console.log(dd());
              uu[item] = dd();
            }
          });
        });
    }

   
    console.log(uu);
    const results = [];
    uu.forEach((e) => {
      if (e.ignore === "ref") {
        results.push(`${e.key} : {id:data['${e.key}']}`);
      } else {
        results.push(`${e.key} : data['${e.key}']`);
      }
    });
    let x = `fetch('https://yrzoud88dh5x80f4266.simplifycloudlab.com/v4_6_release/apis/3.0/service/tickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization':'Basic cGVubWFuYWdlKzhldDRWUVZZb0taQ1hMeTQ6NUdNc0h3OVNZdEV0RTI5Zw==',
                'clientId':'f9163e2b-a465-46e4-8f42-0a193c68ee9c',
            },
            body:JSON.stringify({${results}})
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
    if (buttonClicked === "SaveMapping") {
      window.open("/form", "_blank");
    }
    console.log(uu);
    handleSave(uu, requiredFields);
    console.log(selected);
  };

  useEffect(() => {
    if (
      swaggerData &&
      selectedTable.length &&
      selectApiMethod.length &&
      SelectedResponse.length
    ) {
        if(Object.keys(swaggerData).includes("openapi")){
            console.log("hello");
            let apidatas;
            if (selectApiMethod === "post") {
              apidatas =
                swaggerData.paths[selectedTable][selectApiMethod].requestBody.content[
                  "application/json"
                ].schema["$ref"];
            } else if (selectApiMethod === "get") {
              apidatas =
                swaggerData.paths[selectedTable][selectApiMethod].responses["200"]
                  .content["application/vnd.connectwise.com+json; version=2022.1"]
                  .schema.items["$ref"];
            }
            let requiredval = getdesiredvalue(apidatas);
            //   let apidata = swaggerData.components.schemas[requiredval].properties;
            //   let requiredFields;
            let p = swaggerData.components.schemas[requiredval];
            if (Object.keys(p).includes("required")) {
              setRequired(p.required);
            }
        }
        else{
            let data1=swaggerData.paths[selectedTable][selectApiMethod].responses;
            if(Object.keys(data1).includes("200")){
                data1 = data1["200"]["$ref"];
               }else if(Object.keys(data1).includes("201")){
                data1 = data1["201"]["$ref"];
               }else {
                data1 = data1["204"]["$ref"];
               }
            let requiredval1= getdesiredvalue(data1);
            let apidatas=swaggerData.responses[requiredval1].schema["$ref"]
            let requiredval2 = getdesiredvalue(apidatas);
           
            let p = swaggerData.definitions[requiredval2];
            if (Object.keys(p).includes("required")) {
              setRequired(p.required);
            }
        }  
         
    }
  }, [swaggerData, selectedTable, selectApiMethod, SelectedResponse]);
  console.log(required);
  useEffect(() => {
    swaggerData &&
      selectedTable.length &&
      selectApiMethod.length &&
      setSelectedResponse("");
    setColumns();
    setExpandedAccordion(false);
    setActions();
    setServices("");
  }, [swaggerData, selectedTable, selectApiMethod]);

  useEffect(() => {
    required.map((e, index) => {
      setMappings((prev) => {
        return {
          ...prev,
          [e]: [e],
        };
      });
    });
  }, [required]);

  const handleSave = (data, requiredFields) => {
    console.log(data);
    console.log(jsonfile);
    var json = Object.assign({}, data);
    console.log(json);
    handlecreatefile({
      label: "search",
      title: "Search Form",
      description: "Search using belox Textbox",
      type: "object",
      required: requiredFields,
      properties: json,
    });
  };
  // let json;
  const handlecreatefile = (data) => {
    console.log(data);
    const json = JSON.stringify(data);
    if (buttonClicked === "SaveMapping") {
      setJsonfile(JSON.stringify(data));
      setJsonData(JSON.stringify(data));
      localStorage.setItem("jsonSchema", json);
    } else if (buttonClicked === "GenerateForm") {
      //comment the below line when storing in database
      
      //   console.log(json);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "data.json";
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    const handlestatedatachange = () => {
      setStateData({
        ...stateData,
        ApiEndpoint: selectedTable,
        ApiMethod: selectApiMethod,
        Response: SelectedResponse,
        MappedServices: services,
        jsonTemplate: jsonfile,
        ActionTag: Actions,
      });
    };
    jsonfile.length && handlestatedatachange();
  }, [jsonfile]);


  useEffect(() => {
  buttonClicked && handleData()
  }, [buttonClicked])


  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Add API and Map Tables
      </Typography>
      <Accordion sx={{ width: "100%" }} expanded={expandedAccordion}>
        <AccordionSummary
          sx={{
            pointerEvents: "none",
            cursor: "default",
          }}
          aria-controls="panel-content"
          id="panel-header"
        >
          <form className="forms">
            <Box
              sx={{
                display: "flex",

                width: "150%",
                maxWidth: "150%",
                pb: 2,
                pt: 2,
              }}
            >
              <Input
                type="file"
                sx={{
                  width: "17%",
                  maxWidth: "7%",
                  minWidth: "17%",
                  pointerEvents: "auto",
                }}
                onChange={(e) =>
                  handleFileSelectChange(
                    e,
                    setSwaggerData,
                    setTableNames,
                    setSelectedTable,
                    setColumns
                  )
                }
              />

              <FormControl
                sx={{
                  width: "17%",
                  maxWidth: "17%",
                  minWidth: "17%",
                  pointerEvents: "auto",
                  ml: "1%",
                }}
              >
                <InputLabel id="table-select-label">Select Api:</InputLabel>
                <Select
                  labelId="table-select-label"
                  id="table-select"
                  value={selectedTable}
                  label="Select Table:"
                  onChange={(e) =>
                    handleApiSelected(e.target.value, setSelectedTable)
                  }
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  {tableNames.map((tableName, index) => (
                    <MenuItem value={tableName} key={index}>
                      {tableName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                sx={{
                  width: "13%",
                  maxWidth: "13%",
                  minWidth: "13%",
                  pointerEvents: "auto",
                  ml: "1%",
                }}
              >
                <InputLabel id="api-method-label">Api Method</InputLabel>
                <Select
                  sx={{
                    pointerEvents: "auto",
                  }}
                  labelId="api-method-label"
                  id="api-method-select"
                  value={selectApiMethod}
                  label="API Method"
                  onChange={(e) => handleApiMethodChange(e, setSelectApiMethod)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {selectedTable &&
                    apiMethods.length > 0 &&
                    apiMethods.map((apiMethod, index) => (
                      <MenuItem value={apiMethod} key={index}>
                        {apiMethod}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl
                sx={{
                  width: "13%",
                  maxWidth: "13%",
                  minWidth: "13%",
                  pointerEvents: "auto",
                  ml: "1%",
                  mr: "1%",
                }}
              >
                <InputLabel id="api-method-label">Responses</InputLabel>
                <Select
                  sx={{
                    pointerEvents: "auto",
                  }}
                  labelId="api-method-label"
                  id="api-method-select"
                  value={SelectedResponse}
                  label="API Method"
                  onChange={(e) => {
                    handleResponse(e, setSelectedResponse);
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {selectedTable &&
                    apiMethods &&
                    response.length &&
                    response.map((res, index) => (
                      <MenuItem value={res} key={index}>
                        {res}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </form>
        </AccordionSummary>
        <AccordionDetails sx={{ borderTop: "2px solid grey", pt: 3 }}>
          {columns && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",

                  width: "100%",
                  maxWidth: "100%",
                  pb: 2,
                  pt: 2,
                }}
              >
                <FormControl fullWidth sx={{ ml: 1 }}>
                  <InputLabel id="demo-simple-select-label">
                    Action Tag
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Actions}
                    label="Select Services"
                    onChange={(e) => handleAction(e, setActions)}
                    // sx={{width:"50%"}}
                  >
                    {actionMethods.map((action, index) => (
                      <MenuItem value={action} key={index}>
                        {action}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "90%",
                }}
              >
                <Paper
                  id="columnsCard"
                  sx={{
                    minWidth: "88%",

                    flexWrap: "wrap",

                    display: "flex",

                    alignItems: "flex-start",
                    backgroundColor: "#e7eaf6",
                    mt: 2,
                    py: 2,
                    px: 2,
                  }}
                  elevation={5}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(ev) => {
                    ev.preventDefault();
                    var dragComponent = ev.dataTransfer.getData("dragId");
                    ev.currentTarget.appendChild(
                      document.getElementById(dragComponent)
                    );
                  }}
                >
                  {columns.map((lsCol, index) => {
                    return (
                      <Paper
                        key={index}
                        id={`${lsCol}${index}`}
                        elevation={4}
                        sx={{
                          pr: 2,
                          py: 1,
                          mx: 2,
                          my: 1,
                          cursor: "grab",
                          minWidth: "160px",
                          maxWidth: "80%",
                          display: "flex",
                          height: "min-content",
                        }}
                        draggable="true"
                        onDragStart={(e) => {
                          e.dataTransfer.setData("dragId", e.target.id); // eslint-disable-next-line
                          mappings &&
                            Object.keys(mappings).map((mapKey) => {
                              mappings[mapKey].includes(e.target.textContent) &&
                                setMappings((prev) => {
                                  return {
                                    ...prev,
                                    [mapKey]: prev[mapKey].filter(
                                      (x) => x !== e.target.textContent
                                    ),
                                  };
                                });
                            });
                        }}
                      >
                        <DragIndicatorIcon sx={{ mr: 2 }} />
                        <Typography
                          key={index}
                          value={lsCol}
                          className={"capitalizeData"}
                        >
                          {lsCol}
                        </Typography>
                      </Paper>
                    );
                  })}
                </Paper>
                <Box
                  sx={{
                    minWidth: "72%",
                    maxWidth: "80%",
                    px: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      my: 1,
                      mt: 5,
                      width: "235%",
                      minHeight: "76px",
                    }}
                  >
                    <Box
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                      onDrop={(ev) => {
                        ev.preventDefault();
                        var dragComponent = ev.dataTransfer.getData("dragId");
                        ev.currentTarget.appendChild(
                          document.getElementById(dragComponent)
                        );

                        setMappings((prev) => {
                          return {
                            ...prev,
                            [dragComponent]: [
                              document.getElementById(dragComponent)
                                .textContent,
                            ],
                          };
                        });
                        console.log(mappings);
                      }}
                      component="span"
                      sx={{
                        p: 1,
                        border: "2px dashed grey",
                        width: "50%",
                        minHeight: "56px",
                        backgroundColor: "#e7eaf6",
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {required.length > 0 &&
                        required.map((field, index) => {
                          return (
                            <Paper
                              key={index}
                              id={`${field}${index}`}
                              sx={{
                                pr: 2,
                                py: 1,
                                pl: 2,
                                mx: 2,
                                my: 1,
                                cursor: "grab",
                                minWidth: "160px",
                                maxWidth: "80%",
                                display: "flex",
                                height: "min-content",
                              }}
                              elevation={5}
                            >
                              <Typography
                                key={field}
                                value={field}
                                className={"capitalizeData"}
                                // style={{ margin: "4px" }}
                              >
                                {field}
                              </Typography>
                            </Paper>
                          );
                        })}
                    </Box>
                  </Box>
                </Box>
              </FormControl>
              <Box
                sx={{
                  mt: 5,
                  ml: "auto",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant={"contained"}
                  onClick={() => {
                    setButtonClicked("GenerateForm");
                    // handleData();
                  }}
                  sx={{ mt: 1 }}
                  type="submit"
                  disabled={!Actions}
                >
                  Generate Form
                </Button>

                <Button
                  variant={"contained"}
                  onClick={() => {
                    setButtonClicked("SaveMapping");
                    // handleData();
                  }}
                  sx={{ mt: 1 }}
                  type="submit"
                  disabled={!Actions}
                >
                  Save mapping
                </Button>
              </Box>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};
export default JsonTemplate;
