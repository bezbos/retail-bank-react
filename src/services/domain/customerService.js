import http from "../httpService";
import {apiUrl, apiVersion} from "../../config.json";

export async function getCustomersRange(pageIndex = 0){
    return await http.get(apiUrl + apiVersion + "/customers/" + pageIndex);
}

export async function getCustomer(id){
    return await http.get(apiUrl + apiVersion + "/customer/" + id);
}

export async function getCustomerByPersonalDetails(personalDetails){
    return await http.get(apiUrl + apiVersion + "/customer?personalDetails=" + personalDetails);
}

export async function addCustomer(customer){
    return await http.post(apiUrl + apiVersion + "/customer", customer);
}

export async function updateCustomer(customer){
    return await http.put(apiUrl + apiVersion + "/customer", customer);
}

export async function deleteCustomer(id){
    return await http.delete(apiUrl + apiVersion + "/customer/" + id);
}

export default {
    getCustomersRange,
    getCustomer,
    getCustomerByPersonalDetails,
    addCustomer,
    updateCustomer,
    deleteCustomer
}