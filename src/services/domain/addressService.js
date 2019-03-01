import http from "../httpService";
import {apiUrl, apiVersion} from "../../config.json";

export async function getAddressesRange(pageIndex = 0){
    return await http.get(apiUrl + apiVersion + "/addresses/" + pageIndex);
}

export async function addAddress(address){
    return await http.post(apiUrl + apiVersion + "/address", address);
}

export async function updateAddress(address){
    return await http.put(apiUrl + apiVersion + "/address", address);
}

export async function deleteAddress(id){
    return await http.put(apiUrl + apiVersion + "/address/" + id);
}

export default {
    getAddressesRange,
    addAddress,
    updateAddress,
    deleteAddress
}