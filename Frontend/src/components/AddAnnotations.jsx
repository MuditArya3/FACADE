import React, { useState } from "react";

const AddAnnotations = () => {
    const [selectedApi, setSelectedApi] = useState("");
    const [selectedMethod, setSelectedMethod] = useState("");
    const [serviceInput, setServiceInput] = useState("");
    const [operationInput, setOperationInput] = useState("");

    const handleServiceChange = (event) => {
        setSelectedApi(event.target.value);
    };

    const handleOperationChange = (event) => {
        setSelectedMethod(event.target.value);
    };

    const handleServiceInputChange = (event) => {
        setServiceInput(event.target.value);
    };

    const handleOperationInputChange = (event) => {
        setOperationInput(event.target.value);
    };

    const handleSave = () => {
        // Perform save logic here
        console.log("Service:", selectedApi);
        console.log("Operation:", selectedMethod);
        console.log("Service Input:", serviceInput);
        console.log("Operation Input:", operationInput);
    };

    const handlePreview = () => {
        // Perform preview logic here
    };

    const handleDownload = () => {
        // Perform download logic here
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "10rem",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                }}
            >
                <select
                    value={selectedApi}
                    onChange={handleServiceChange}
                    style={{
                        marginRight: "20px",
                        padding: "1rem",
                    }}
                >
                    <option value="">Select Api</option>
                    <option value="service1">Service 1</option>
                    <option value="service2">Service 2</option>
                    <option value="service3">Service 3</option>
                </select>
                <select
                    value={selectedMethod}
                    onChange={handleOperationChange}
                    style={{
                        marginRight: "20px",
                        padding: "1rem",
                    }}
                >
                    <option value="">Select Method</option>
                    <option value="operation1">Operation 1</option>
                    <option value="operation2">Operation 2</option>
                    <option value="operation3">Operation 3</option>
                </select>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginRight: "20px",
                    }}
                >
                    <label>Services:</label>
                    <input
                        type="text"
                        value={serviceInput}
                        onChange={handleServiceInputChange}
                        style={{ marginTop: "5px", padding: "5px" }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label>Operations:</label>
                    <input
                        type="text"
                        value={operationInput}
                        onChange={handleOperationInputChange}
                        style={{ marginTop: "5px", padding: "5px" }}
                    />
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                }}
            >
                <button onClick={handleSave} style={{ marginRight: "10px" }}>
                    Save
                </button>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                }}
            >
                <button onClick={handlePreview} style={{ marginRight: "10px" }}>
                    Preview
                </button>
                <button
                    onClick={handleDownload}
                    style={{ marginRight: "10px" }}
                >
                    Download
                </button>
            </div>
        </div>
    );
};

export default AddAnnotations;
