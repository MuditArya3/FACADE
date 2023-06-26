import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormComponent from "./components/FormComponent/FormComponent.jsx";
import GridComponent from "./components/GridComponent/GridComponent.js";
import ApplicationForm from "./components/ApplicationFormComponent/ApplicationForm.jsx";
import JsonTemplate from "./components/JsonTemplateComponent/JsonTemplate.jsx";
import { useState } from "react";
import SwaggerGrid from "./components/SwaggerGrid/SwaggerGrid.jsx";

function App() {
  const [jsonData, setJsonData] = useState();
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/form"
            element={
              <FormComponent jsonData={jsonData} setJsonData={setJsonData} />
            }
          />
          <Route path="/grid" element={<GridComponent />} />
          <Route path="/application" element={<ApplicationForm />} />
          <Route path="/swagger" element={<SwaggerGrid  jsonData={jsonData} setJsonData={setJsonData} />} />
          <Route
            path="/"
            element={
              <JsonTemplate jsonData={jsonData} setJsonData={setJsonData} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
