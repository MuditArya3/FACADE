import axios from "axios";
import { baseURL } from "../../AppSettings.js";

export const handleSubmit = (e,showformbutton,selecteddata,setAPIData,setshowform,showform) => {
    if (showformbutton) {
        const formData = e.formData;
        console.log(formData);
        const customerId = selecteddata.customerId;

    const apiUrl = `${baseURL}/api/Customers/Customers/${customerId}`;
    axios
        .put(apiUrl, formData)
        .then(() => {
            alert("Updated successfully");

                setAPIData((prevData) => {
                    const updatedData = prevData.map((item) => {
                        if (item.customerId === customerId) {
                            return { ...item, ...formData };
                        }
                        return item;
                    });
                    return updatedData;
                });
                setshowform(!showform);
            })
            .catch((error) => {
                console.error(error);
            });
    }
};
