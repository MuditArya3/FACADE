import React, { useState } from "react";

import Papa from "papaparse";

const CsvToJsonConverter = () => {
    const [csvData, setCsvData] = useState(null);

    const [jsonSchema, setJsonSchema] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            Papa.parse(file, {
                complete: (result) => {
                    setCsvData(result.data);
                },

                header: true,

                skipEmptyLines: true,
            });
        }
    };

    const generateCSVToJSONSchema = (data) => {
        const entityProperties = {};

        const entityNameColumn = Object.keys(data[0])[0];

        data.forEach((row) => {
            const entity = row[entityNameColumn];

            if (entity) {
                if (!entityProperties[entity]) {
                    entityProperties[entity] = {
                        enum: [entity],
                        properties: {},
                    };
                }

                Object.entries(row).forEach(([key, value]) => {
                    if (key !== entityNameColumn && value) {
                        const trimmedValue = value.trim();
                        if (!entityProperties[entity].properties[key]) {
                            entityProperties[entity].properties[key] = {
                                type: "string",
                                enum: [],
                            };
                        }
                        entityProperties[entity].properties[key].enum.push(
                            trimmedValue
                        );
                    }
                });
                //let properties = {};

                // Object.entries(row).forEach(([key, value]) => {
                //     if (key !== entityNameColumn && value) {
                //         const trimmedValue = value.trim();

                //         if (!properties[key]) {
                //             properties[key] = { type: "string", enum: [] };
                //         }

                //         properties[key].enum.push(trimmedValue);
                //     }
                // });

                // if (!entityProperties[entity]) {
                //     entityProperties[entity] = { enum: [entity] };
                // }

                // if (!entityProperties[entity].properties) {
                //     entityProperties[entity].properties = {};
                // }

                // entityProperties[entity].properties = {
                //     ...entityProperties[entity].properties,
                //     ...properties,
                // };
            }
        });

        const jsonData = {
            type: "object",

            properties: {
                [entityNameColumn]: {
                    enum: Object.keys(entityProperties),
                },
            },

            allOf: Object.keys(entityProperties).map((entity) => {
                return {
                    if: {
                        properties: {
                            [entityNameColumn]: { const: entity },
                        },
                    },

                    then: {
                        properties: entityProperties[entity].properties,

                        required: Object.keys(
                            entityProperties[entity].properties
                        ),
                    },
                };
            }),
        };

        jsonData.allOf.push({
            required: [entityNameColumn],
        });

        return jsonData;
    };

    const handleConvertClick = () => {
        if (csvData) {
            const jsonData = generateCSVToJSONSchema(csvData);

            setJsonSchema(jsonData);
        }
    };

    console.log(csvData);

    return (
        <div>
            <input type="file" onChange={handleFileChange} />

            <button onClick={handleConvertClick}>
                Convert CSV to JSON Schema
            </button>

            {jsonSchema && <pre>{JSON.stringify(jsonSchema, null, 2)}</pre>}
        </div>
    );
};

export default CsvToJsonConverter;
