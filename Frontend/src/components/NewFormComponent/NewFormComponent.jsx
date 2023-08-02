import {
  Accordion,
  AccordionDetails,
  Container,
  Typography,
} from "@mui/material";
import Form from "@rjsf/core";
import React, { useState } from "react";
import "../NewFormComponent/NewFormComponent.css";

const NewFormComponent = () => {
  const [schemaa, setSchemaa] = useState();
  const uiSchema2 = require("../../jsonFiles/uiSchema2.json");
  const formData = require("../../jsonFiles/formData.json");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target.result;
        const parsedSchema = JSON.parse(content);
        setSchemaa(parsedSchema);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
        setSchemaa({});
      }
    };

    reader.readAsText(file);
  };

  const handleJsonEdit = (e) => {
    try {
      const editedSchema = JSON.parse(e.target.value);
      setSchemaa(editedSchema);
    } catch (error) {
      console.error("Error parsing edited JSON:", error);
    }
  };

  return (
    <div className="fullpage">
      <div>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "Hidden",
            py: 4,
          }}
        >
          <Accordion sx={{ width: "100%" }} expanded={true} Hidden={false}>
           <h4 className="heading">Provide your JSON here</h4>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="inputbox"
            />
            {schemaa && (
              <div>
              <div className="json-display">
                <h4>JSON Data from Schema:</h4>
                <textarea
                  value={JSON.stringify(schemaa,null,2)}
                  onChange={handleJsonEdit}
                  className="editdata"
                  // rows={50}
                />
              </div>
              <div className="json-display">
              <h4>UiSchema Data:</h4>
              <textarea
                value={JSON.stringify(uiSchema2,null,2)}
                // onChange={handleJsonEdit}
                className="editdata"
                // rows={50}
              />
            </div>
            </div>
            )}

            <AccordionDetails sx={{ pt: 3 }}>
              {schemaa && <Form schema={schemaa} uiSchema={uiSchema2} />}
            </AccordionDetails>
          </Accordion>
        </Container>
      </div>
    </div>
  );
};

export default NewFormComponent;
