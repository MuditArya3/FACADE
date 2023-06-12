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
//   import React, { useState } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/JsonTemplate.css";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useEffect } from "react";
import axios from "axios";
//   import localswagger from "../localswagger.json"; // eslint-disable-next-line
import { type } from "@testing-library/user-event/dist/type"; // eslint-disable-next-line
import { DataObject } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
//  import { SwaggerClient } from 'swagger-client'

const JsonTemplate = ({ jsonData, setJsonData }) => {
  const [mappings, setMappings] = useState({});
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const [selectApiMethod, setSelectApiMethod] = useState("");
  const [tableNames, setTableNames] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [swaggerData, setSwaggerData] = useState();
  const [columns, setColumns] = useState();
  const [options, setOptions] = useState(); // eslint-disable-next-line
  const [swaggerDatas, setSwaggerDatas] = useState();
  const [services, setServices] = useState("");
  const [openNewColumnModal, setOpenNewColumnModal] = useState(false);
  const [newColumnDetails, setNewColumnDetails] = useState({
    columnName: "",
    columnType: "",
  });
  const [apiMethods, setapiMethods] = useState([]); // eslint-disable-next-line
  const [response, setResponse] = useState([]);
  const [SelectedResponse, setSelectedResponse] = useState("");
  const [selected, setSelected] = useState({});
  const [jsonfile, setJsonfile] = useState([]);
  const [ApiData, setApiData] = useState();
  const [Actions, setActions] = useState();
  const [stateData, setStateData] = useState({});
  const [required, setRequired] = useState([]);
  // const [tableNames, setTableNames] = useState([]);

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
  const actionMethods = ["CREATE", "FETCH", "UPDATE", "SEARCH", "DELETE"];

  const handleAction = (e) => {
    setActions(e.target.value);
  };

  const handleOpenNewColumnModal = () => setOpenNewColumnModal(true);

  const handleCloseNewColumnModal = () => {
    setNewColumnDetails({
      columnName: "",
      columnType: "",
    });
    setOpenNewColumnModal(false);
  };

  const handleAccordionChange = () => {
    setExpandedAccordion(true);
  };

  const handleApiMethodChange = (e) => {
    setSelectApiMethod(e.target.value);
    console.log(selectApiMethod);
  };

  const handleResponse = (e) => {
    setSelectedResponse(e.target.value);
    console.log(SelectedResponse);
  };

  const handlechange = (e) => {
    setServices(e.target.value);
  };
  console.log(services);

  useEffect(() => {
    handleTableSwaggerSubmit();
    handleAccordionChange();
  }, [SelectedResponse]);

  const handleFileSelectChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        setSwaggerData(data);
      } catch (error) {
        console.error("Error parsing Swagger data:", error);
      }
    };
    reader.readAsText(file);
    setTableNames([]);
    setSelectedTable("");
    setColumns();
    console.log("swaggerData", swaggerData);
  };

  const getdesiredvalue = (apidatas) => {
    const valueArray = apidatas.split("/");
    const desiredValue = valueArray[valueArray.length - 1];
    console.log("desired----", desiredValue);
    return desiredValue;
  };

  const handleData = (e) => {
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
    let requiredFields;
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
    let uu = [];

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

    console.log(uu);
    handleSave(uu, requiredFields);
    window.open("/form", "_blank");
    console.log(jsonfile);
    console.log(selected);
  };

  useEffect(() => {
    if (
      swaggerData &&
      selectedTable.length &&
      selectApiMethod.length &&
      SelectedResponse.length
    ) {
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
      console.log(required);
    }
  }, [swaggerData, selectedTable, selectApiMethod, SelectedResponse]);

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

  const handleTableSwaggerSubmit = () => {
    if (selectedTable) {
      if (selectApiMethod === "post" && SelectedResponse === "requestBody") {
        let z =
          swaggerData.paths[selectedTable][selectApiMethod][SelectedResponse]
            .content["application/json"].schema["$ref"];
        console.log(z);
        console.log(selectedTable);
        var i = getdesiredvalue(z);
        const apidata = swaggerData.components.schemas[i];
        console.log(Object.keys(apidata.properties));
        // Object.keys(apidata.properties).map((i) => {
        //   console.log(i);
        //   console.log(required);
        //   required.map((e) => {
        //     console.log(e);
        //     if (i !== e) {
        //       console.log(i, e);
        //       setColumns((prev) => {
        //         return { ...prev, [i]: true };
        //       });
        //     }
        //   });
        // });
        setColumns(Object.keys(apidata.properties));
      } else if (
        selectApiMethod === "get" &&
        SelectedResponse === "responses"
      ) {
        let x =
          swaggerData.paths[selectedTable][selectApiMethod].responses["200"]
            .content["application/vnd.connectwise.com+json; version=2022.1"]
            .schema;
        if (x.type === "array") {
          x = x.items["$ref"];
        } else {
          x = x["$ref"];
        }
        var k = getdesiredvalue(x);
        const apidata1 = swaggerData.components.schemas[k];
        // Object.keys(apidata1.properties).map((i) => {
        //   required.map((e) => {
        //     if (i !== e) {
        //       setColumns(Object.keys(i));
        //     }
        //   });
        // });
        setColumns(Object.keys(apidata1.properties));
      }
    }
  };
  const handleApiSelected = (tableName) => {
    setSelectedTable(tableName);
    console.log("setSelectedTable -", selectedTable);
  };

  const handleNewColumnNameChange = (e) => {
    setNewColumnDetails((prev) => {
      return { ...prev, columnName: e.target.value };
    });
  };

  const handleNewColumnTypeChange = (e) => {
    setNewColumnDetails((prev) => {
      return { ...prev, columnType: e.target.value };
    });
  };

  const handleNewColumnSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:7055/NewColumn", newColumnDetails)
      .then(() => {
        console.log("Data inserted successfully");
        handleCloseNewColumnModal();
      });
  };

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
    setJsonfile(JSON.stringify(data));
    setJsonData(JSON.stringify(data));
    //comment the below line when storing in database
    const json = JSON.stringify(data);
    console.log(json);
    localStorage.setItem("jsonSchema", json);
    // const blob = new Blob([json], { type: "application/json" });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // console.log(blob);
    // link.download = "data.json";
    // link.href = url;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // URL.revokeObjectURL(url);
  };
  console.log(jsonfile);
  console.log(jsonData);

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
                onChange={handleFileSelectChange}
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
                  onChange={(e) => handleApiSelected(e.target.value)}
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
                  onChange={handleApiMethodChange}
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
                    handleResponse(e);
                  }}
                  // handleResponse}
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
                    onChange={handleAction}
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
                  {required.length > 0 &&
                    columns.map((lsCol, index) => {
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
                                mappings[mapKey].includes(
                                  e.target.textContent
                                ) &&
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
                                style={{ margin: "4px" }}
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
                  //onClick={
                  // handleOpenNewColumnModal}
                  sx={{ mt: 1 }}
                  type="submit"
                >
                  Generate Form
                </Button>

                <Button
                  variant={"contained"}
                  onClick={() => {
                    handleData();
                  }}
                  sx={{ mt: 1 }}
                  type="submit"
                  // disabled=
                  // {!Actions}
                >
                  Save mapping
                </Button>

                <Modal
                  open={openNewColumnModal}
                  onClose={handleCloseNewColumnModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      bgcolor: "background.paper",
                      border: "2px solid #000",
                      boxShadow: 24,
                      p: 4,
                      borderRadius: "5px",
                    }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Add new column to map to it
                    </Typography>
                    <Box
                      id="modal-modal-description"
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <form
                        className="new-column-form"
                        onSubmit={handleNewColumnSubmit}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <FormControl>
                            <TextField
                              label="Column name:"
                              variant="outlined"
                              sx={{ my: 1 }}
                              id={"column-name"}
                              value={newColumnDetails.columnName}
                              onChange={handleNewColumnNameChange}
                            />
                          </FormControl>
                          <FormControl sx={{ my: 1 }}>
                            <InputLabel id="data-type-select-label">
                              Data type
                            </InputLabel>
                            <Select
                              labelId="data-type-select-label"
                              id="data-type-select"
                              value={newColumnDetails.columnType}
                              label="Data type"
                              onChange={handleNewColumnTypeChange}
                            >
                              <MenuItem value={""}>
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={"string"}>String</MenuItem>
                              <MenuItem value={"int"}>Int</MenuItem>
                              <MenuItem value={"float"}>Float</MenuItem>
                              <MenuItem value={"double"}>Double</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            width: "50%",
                            ml: "auto",
                            justifyContent: "space-between",
                            mt: 3,
                          }}
                        >
                          <Button
                            variant="contained"
                            onClick={handleCloseNewColumnModal}
                          >
                            Cancel
                          </Button>
                          <Button variant="contained" type="submit">
                            Save
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  </Box>
                </Modal>
              </Box>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};
export default JsonTemplate;
