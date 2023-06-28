import React from "react";
import GridComponent from "../GridComponent/GridComponent";

const UpdateGrid = (lowercaseAnnotation) => {
  return (
    <div>
      <GridComponent lowercaseAnnotation={lowercaseAnnotation} />
    </div>
  );
};

export default UpdateGrid;
