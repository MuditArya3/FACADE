import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormComponent from "./components/FormComponent.jsx";
import GridComponent from "./components/GridComponent";
import ApplicationForm from "./components/ApplicationFormComponent";
import JsonTemplate from "./components/JsonTemplateComponent/JsonTemplate.jsx";
import { useState } from "react";

function App() {
  const [jsonData, setJsonData] = useState();
  console.log(jsonData);
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
