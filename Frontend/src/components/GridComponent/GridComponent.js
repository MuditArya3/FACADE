import axios from "axios";
//import { domainUrl } from "../MappingComponent/Mapping";
import React from 'react';
export const getGridData = (setAPIData, setNewApiState) => {
  // console.log(dom);
  axios
    .get('https://localhost:7184/api/Desktop/Desktops')
    .then((res) => {
      if (res && res.data) {
        // props = res.data;
        console.log(res.data);
        setAPIData(res.data);
        setNewApiState(res.data);
        // return props;
      } else return [];
    })
    .catch((error) => {
      return error;
    });
  //   return response;
};
// export const getGridData = (setAPIData,setNewApiState) => {
//     axios
//       .get(domainUrl)
//       .then((res) => {
//         if (res && res.data) {
//           // props = res.data;
//           console.log(res.data);
//           setAPIData(res.data);
//           setNewApiState(res.data);
//           // return props;
//         } else return [];
//       })
//       .catch((error) => {
//         return error;
//       });

//     //   return response;
//   };

//   export const handleData = (selecteddata,setshowform,setJsonData) => {
//     //   localStorage.setItem("ColumnData", JSON.stringify(columns));
//     console.log("helloooooo");
//     let requiredFields;
//     let uu = {};
//     let layout = {};
//     Object.keys(selecteddata).map((rcol) => {
//       console.log(rcol);
//       console.log(selecteddata[rcol]);
//       layout = {
//         key: rcol,
//         title: rcol,
//         type:
//           typeof selecteddata[rcol] === "number"
//             ? "integer"
//             :typeof selecteddata[rcol]==="None"
//             ? "string"
//             : typeof selecteddata[rcol],
//         default: selecteddata[rcol],
//       };
//       uu[rcol] = { ...layout };
//     });
//   //   return response;
// };

export const handleData = (selecteddata, setshowform, setJsonData) => {
  // localStorage.setItem("ColumnData", JSON.stringify(columns));
  console.log("helloooooo");
  let requiredFields;
  let uu = {};
  let layout = {};
  Object.keys(selecteddata).map((rcol) => {
    console.log(rcol);
    console.log(selecteddata[rcol]);
    layout = {
      key: rcol,
      title: rcol,
      type:
        typeof selecteddata[rcol] === "number"
          ? "integer"
          : typeof selecteddata[rcol] === "None"
          ? "string"
          : typeof selecteddata[rcol],
      default: selecteddata[rcol],
    };
    uu[rcol] = { ...layout };
  });
  console.log(uu);
  setshowform(true);
  handleSave(uu, setJsonData);
};

const handleSave = (data, setJsonData) => {
  console.log(data);
  let json = Object.assign({}, data);
  console.log(json);
  handlecreatefile(
    {
      label: "search",
      title: "JSON Form",
      // description: "Search using below Textbox",
      type: "object",
      // required: [requiredFields],
      properties: json,
    },
    setJsonData
  );
};

const handlecreatefile = (data, setJsonData) => {
  console.log(data);
  const json = JSON.stringify(data);
  // if (buttonClicked === "SaveMapping") {
  // setJsonfile(JSON.stringify(data));
  setJsonData(JSON.stringify(data));
  localStorage.setItem("jsonSchema", json);
};

export const handleRowData=(mappings,getAPIData,key)=>{
  {Object.keys(mappings).map((m) => {
    const mappingKey = mappings[m][0];
    const mapp = mappingKey.toLowerCase();
    console.log(mappingKey);
    console.log(getAPIData[key]);
    return Object.keys(getAPIData[key]).map((m)=>{
      console.log(m);
      const getdata=m.toLowerCase();
      if(getdata===mapp){
        return (
          <div
            className="apiGridItems"
            title={getAPIData[key][mappingKey]}
            key={mappingKey}
          >
            {getAPIData[key][mappingKey]}
          </div>
        );
      }
    })

})}}
