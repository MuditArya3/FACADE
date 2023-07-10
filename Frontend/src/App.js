import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormComponent from "./components/FormComponent/FormComponent.jsx";
import GridComponent from "./components/GridComponent/GridComponent.jsx";
import ApplicationForm from "./components/ApplicationFormComponent";
import JsonTemplate from "./components/JsonTemplateComponent/JsonTemplate.jsx";
import { useState } from "react";
import SwaggerGrid from "./components/SwaggerGrid/SwaggerGrid.jsx";
import Mapping from "./components/MappingComponent/Mapping.jsx";
import AddAnnotations from "./components/AddAnnotation/AddAnnotations.jsx";



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
              <SwaggerGrid jsonData={jsonData} setJsonData={setJsonData} />
            }
          />
          <Route
            path="/mapping"
            element={<Mapping jsonData={jsonData} setJsonData={setJsonData} />}
          />
          <Route path="/json" element={<AddAnnotations/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
