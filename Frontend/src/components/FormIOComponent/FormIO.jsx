import { Form } from "@formio/react";
import React from 'react'
import "./Formio.css"

function FormIO() {
    let schema1 = JSON.parse(localStorage.getItem("jsonSchema"));
    // const form={
    //     title:"My form",
    //     display:"Form",
    //     components:[
    //         {
    //             label:"Hello",
    //             key:"hello",
    //             type:"textfield",
    //             placeholder: 'Enter your last name',
    //             input: true,
    //             tooltip: 'Enter your <strong>Last Name</strong>',
    //             description: 'Enter your <strong>Last Name</strong>'
    //         },
    //         {
    //             label:"Email",
    //             key:"Email",
    //             type:"email",
    //         },
    //         {
    //             type: 'textfield',
    //             key: 'lastName',
    //             label: 'Last Name',
    //             placeholder: 'Enter your last name',
    //             input: true,
    //             tooltip: 'Enter your <strong>Last Name</strong>',
    //             description: 'Enter your <strong>Last Name</strong>'
    //           },
    //         {
    //             label:"Send Info",
    //             key:"submit",
    //             type:"button",
    //         },
    //     ]
    // }
  return (
    <div className="app">
        <h2>FormIO</h2>
        <Form form={schema1}/>
    </div>
  )
}

export default FormIO