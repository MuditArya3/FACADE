export const handleAction = (e, setActions) => {
  setActions(e.target.value);
};

export const actionMethods = ["CREATE", "FETCH", "UPDATE", "SEARCH", "DELETE"];

export const handleAccordionChange = (setExpandedAccordion) => {
  setExpandedAccordion(true);
};

export const handleApiMethodChange = (e, setSelectApiMethod) => {
  setSelectApiMethod(e.target.value);
};

export const handleResponse = (e, setSelectedResponse) => {
  setSelectedResponse(e.target.value);
};

export const handleFileSelectChange = (
  e,

  setSwaggerData,

  setTableNames,

  setSelectedTable,

  setColumns
) => {
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
};

export const getdesiredvalue = (apidatas) => {
  const valueArray = apidatas.split("/");

  const desiredValue = valueArray[valueArray.length - 1];

  console.log("desired----", desiredValue);

  return desiredValue;
};

export const handleTableSwaggerSubmit = (
  selectedTable,

  selectApiMethod,

  SelectedResponse,

  swaggerData,

  required,

  setColumns
) => {
  if (selectedTable) {
    if (Object.keys(swaggerData).includes("swagger")) {
      if (selectApiMethod && SelectedResponse === "responses") {
        let y = swaggerData.paths[selectedTable][selectApiMethod].responses;

        if (Object.keys(y).includes("200")) {
          y = y["200"]["$ref"];
        } else if (Object.keys(y).includes("201")) {
          y = y["201"]["$ref"];
        } else {
          y = y["204"]["$ref"];
        }

        console.log(y);

        var k = getdesiredvalue(y);

        console.log(k);

        let step2 = swaggerData.responses[k].schema["$ref"];

        var j = getdesiredvalue(step2);

        let step3 = swaggerData.definitions[j];

        const apidataProperties = Object.keys(step3.properties);

        const filteredColumnsData = apidataProperties.filter(
          (elem) => !required.includes(elem)
        );

        console.log(filteredColumnsData);

        setColumns(filteredColumnsData);
      }
    } else if (Object.keys(swaggerData).includes("openapi")) {
      if (selectApiMethod === "post" && SelectedResponse === "requestBody") {
        let z =
          swaggerData.paths[selectedTable][selectApiMethod][SelectedResponse]
            .content["application/json"].schema["$ref"];

        console.log(z);

        console.log(selectedTable);

        var i = getdesiredvalue(z);

        const apidata = swaggerData.components.schemas[i];

        console.log(Object.keys(apidata.properties));

        console.log(apidata.properties);

        const apidataProperties = Object.keys(apidata.properties);

        const filteredColumnsData = apidataProperties.filter(
          (elem) => !required.includes(elem)
        );

        console.log(filteredColumnsData);

        setColumns(filteredColumnsData);

        // setColumns(Object.keys(apidata.properties))
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

        const apidataProperties = Object.keys(apidata1.properties);

        const filteredColumnsData = apidataProperties.filter(
          (elem) => !required.includes(elem)
        );

        console.log(filteredColumnsData);

        setColumns(filteredColumnsData);
      }
    }
  }
};

export const handleApiSelected = (tableName, setSelectedTable) => {
  setSelectedTable(tableName);
};

export const handleData = (
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
) => {
  let requiredFields;

  let uu = [];

  console.log(Object.keys(swaggerData));

  if (Object.keys(swaggerData).includes("swagger")) {
    console.log("hello");

    let apidatas = swaggerData.paths[selectedTable][selectApiMethod].responses;

    if (selectApiMethod === "get" || selectApiMethod === "put") {
      apidatas = apidatas["200"]["$ref"];

      console.log("get");
    } else if (selectApiMethod === "delete") {
      apidatas = apidatas["204"]["$ref"];

      console.log("delete");
    } else if (selectApiMethod === "post") {
      if (apidatas.includes("201")) {
        apidatas = apidatas["201"]["$ref"];

        console.log("post");
      } else {
        apidatas = apidatas["200"]["$ref"];

        console.log("post");
      }
    }

    let requiredval = getdesiredvalue(apidatas);

    let apidata = swaggerData.responses[requiredval].schema["$ref"];

    const requiredval2 = getdesiredvalue(apidata);

    const apidata1 = swaggerData.definitions[requiredval2].properties;

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
  } else if (Object.keys(swaggerData).includes("openapi")) {
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

  handleSave(
    uu,
    requiredFields,
    buttonClicked,
    setJsonData,
    setJsonfile,
    setButtonClicked
  );

  console.log(selected);
};

const handleSave = (
  data,
  requiredFields,
  buttonClicked,
  setJsonData,
  setJsonfile,
  setButtonClicked
) => {
  console.log(data);

  var json = Object.assign({}, data);

  console.log(json);

  handlecreatefile(
    {
      label: "search",

      title: "Search Form",

      description: "Search using belox Textbox",

      type: "object",

      required: requiredFields,

      properties: json,
    },
    buttonClicked,
    setJsonData,
    setJsonfile,
    setButtonClicked
  );
};

const handlecreatefile = (
  data,
  buttonClicked,
  setJsonData,
  setJsonfile,
  setButtonClicked
) => {
  console.log(data);

  const json = JSON.stringify(data);

  if (buttonClicked === "SaveMapping") {
    setJsonfile(JSON.stringify(data));

    setJsonData(JSON.stringify(data));

    localStorage.setItem("jsonSchema", json);

    setButtonClicked();
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

    setButtonClicked();
  }
};
