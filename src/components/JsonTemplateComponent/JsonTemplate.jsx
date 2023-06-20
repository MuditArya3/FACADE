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
  handleData,
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
    console.log("shreesh");
    swaggerData && setSelectApiMethod("");
    setSelectedResponse("");
    setActions();
    setColumns();
  }, [selectedTable]);

  const handlechange = () => {
    setapiMethods("");

    setResponse("");
  };

  useEffect(() => {
    swaggerData &&
      selectedTable.length &&
      selectApiMethod.length &&
      setColumns();

    setActions();
  }, [SelectedResponse]);

  useEffect(() => {
    const filteredEndpoints = swaggerData
      ? Object.keys(swaggerData.paths).filter(() => {
          return swaggerData.paths;
        })
      : [];

    setTableNames(filteredEndpoints);
  }, [selectApiMethod, swaggerData]);

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

  useEffect(() => {
    if (
      swaggerData &&
      selectedTable.length &&
      selectApiMethod.length &&
      SelectedResponse.length
    ) {
      if (Object.keys(swaggerData).includes("openapi")) {
        console.log("hello");
        let apidatas;
        if (selectApiMethod === "post") {
          apidatas =
            swaggerData.paths[selectedTable][selectApiMethod].requestBody
              .content["application/json"].schema["$ref"];
        } else if (selectApiMethod === "get") {
          apidatas =
            swaggerData.paths[selectedTable][selectApiMethod].responses["200"]
              .content["application/vnd.connectwise.com+json; version=2022.1"]
              .schema.items["$ref"];
        }
        let requiredval = getdesiredvalue(apidatas);
        let p = swaggerData.components.schemas[requiredval];

        if (Object.keys(p).includes("required")) {
          setRequired(p.required);
        }
      } else {
        let data1 = swaggerData.paths[selectedTable][selectApiMethod].responses;

        if (Object.keys(data1).includes("200")) {
          data1 = data1["200"]["$ref"];
        } else if (Object.keys(data1).includes("201")) {
          data1 = data1["201"]["$ref"];
        } else {
          data1 = data1["204"]["$ref"];
        }

        let requiredval1 = getdesiredvalue(data1);

        let apidatas = swaggerData.responses[requiredval1].schema["$ref"];

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

  // let json;

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

  useEffect(
    (e) => {
      console.log(mappings);
      buttonClicked &&
        handleData(
          e,
          swaggerData,
          selectedTable,
          selectApiMethod,
          mappings,
          setApiData,
          selected,
          required,
          buttonClicked,
          setJsonData,
          setJsonfile,
          setButtonClicked
        );
    },
    [buttonClicked]
  );

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
                  onChange={(e) => {
                    handleApiSelected(e.target.value, setSelectedTable);

                    // handlechange();
                  }}
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
                        console.log(dragComponent);
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
