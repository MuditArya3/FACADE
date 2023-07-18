import Form from "@rjsf/core";
import React from "react";
import "../RenderComponent/RenderUiComponent.css";
const RenderUIComponent = () => {
  const schema = require("../../jsonFiles/schema.json");
  const uiSchema2 = require("../../jsonFiles/uiSchema2.json");
  const formData = require("../../jsonFiles/formData.json");

  return (
    <div>
      <div className="form">
        <Form schema={schema} uiSchema={uiSchema2} formData={formData} />
      </div>
    </div>
  );
};

export default RenderUIComponent;


