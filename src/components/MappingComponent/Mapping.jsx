import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  FormControl,
  Hidden,
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
import "./Mapping.css";
import {
  handleAction,
  getdesiredvalue,
  handleTableSwaggerSubmit,
  handleData,
  getdesiredannotation,
  handleform,
} from "./Mapping";
import { useState } from "react";
import "../JsonTemplateComponent/JsonTemplate.css";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useEffect } from "react";
import { red } from "@mui/material/colors";
import FormComponent from "../FormComponent/FormComponent";
import { useRef } from "react";

const Mapping = ({ jsonData, setJsonData }) => {
  const [mappings, setMappings] = useState({});
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const [selectApiMethod, setSelectApiMethod] = useState("");
  const [tableNames, setTableNames] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [swaggerData, setSwaggerData] = useState();
  const [columns, setColumns] = useState();
  const [options, setOptions] = useState(); // eslbuttonClickedint-disable-next-line
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
  const [actionMethods, setactionMethods] = useState([]);
  const [showform, setshowform] = useState(false);
  const formRef = useRef(null);
  //   let actionMethods=[];
  console.log(options);
  let annotation = getdesiredannotation(localStorage.getItem("Annotation"));
  console.log(annotation);
  const lowercaseAnnotation = annotation.toLowerCase();

  useEffect(() => {
    if (lowercaseAnnotation.includes("create")) {
      console.log("Create");
      actionMethods.push("CREATE");
      actionMethods.map((action) => {
        console.log(action);
      });
    } else if (lowercaseAnnotation.includes("get")) {
      actionMethods.push("FETCH");
      actionMethods.push("SEARCH");
    } else if (lowercaseAnnotation.includes("update")) {
      console.log(actionMethods.push("UPDATE"));
    } else if (lowercaseAnnotation.includes("delete")) {
      console.log(
        actionMethods.includes("DELETE") ? "DELETE" : "Invalid action"
      );
    } else {
      console.log("Invalid annotation");
    }
  }, [annotation]);

  let st = localStorage.getItem("ColumnData");

  useEffect(() => {
    setColumns(JSON.parse(st));
  }, [st]);

  // let columns=JSON.parse(st);
  console.log(columns);
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
    //   setColumns();
  }, [selectedTable]);

  const handlechange = () => {
    setapiMethods("");

    setResponse("");
  };

  useEffect(() => {
    swaggerData &&
      selectedTable.length &&
      selectApiMethod.length &&
      // setColumns();

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
      required
      // setColumns
    );

    //   handleAccordionChange(setExpandedAccordion);
  }, [columns]);

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

  // useEffect(() => {
  //   swaggerData &&
  //     selectedTable.length &&
  //     selectApiMethod.length &&
  //     setSelectedResponse("");

  //   setColumns();

  //   setExpandedAccordion(false);

  //   setActions();

  //   setServices("");
  // }, [swaggerData, selectedTable, selectApiMethod]);

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
        mappings &&
        handleData(
          e,
          mappings,
          buttonClicked,
          setJsonData,
          setJsonfile,
          setButtonClicked,
          columns
        );
      handleform(
        e,
        buttonClicked,
        setshowform,
        showform,
        setButtonClicked,
        formRef
      );
    },
    [buttonClicked]
  );
  useEffect(() => {
    if (showform && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [showform]);

  return (
    <div className="outerdiv">
      <div
        className={lowercaseAnnotation.includes("create") ? "create" : "get"}
      >
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
          <Typography variant="h2" sx={{ mb: 2 }}>
            {annotation}
          </Typography>

          <Accordion sx={{ width: "100%" }} expanded={true}>
            <AccordionDetails sx={{ pt: 3 }}>
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
                        minWidth: "90%",
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
                            id={`${lsCol.Name}${index}`}
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
                              console.log("Dragged element ID:", e.target.id);
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
                              {lsCol.Name}
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
                          width: "251%",
                          minHeight: "76px",
                        }}
                      >
                        <Box
                          onDragOver={(e) => {
                            e.preventDefault();
                          }}
                          onDrop={(ev) => {
                            ev.preventDefault();

                            var dragComponent =
                              ev.dataTransfer.getData("dragId");
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
                      Download JSON
                    </Button>

                    <Button
                      variant={"contained"}
                      onClick={(e) => {
                        setButtonClicked("SaveMapping");
                      }}
                      sx={{ mt: 1 }}
                      type="submit"
                      disabled={!Actions}
                    >
                      Generate Form
                    </Button>
                  </Box>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        </Container>
      </div>
      <div
        className={lowercaseAnnotation.includes("create") ? "create" : "get"}
        ref={formRef}
      >
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
        >{showform &&
            <Accordion sx={{ width: "100%" }} expanded={true} Hidden={false}>
            <AccordionDetails sx={{ pt: 3 }}>
            {showform && <FormComponent />}
            </AccordionDetails>
            </Accordion>
        }
        </Container>
      </div>
    </div>
  );
};

export default Mapping;
