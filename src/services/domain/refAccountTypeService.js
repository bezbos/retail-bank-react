import http from "../httpService";
import {apiUrl, apiVersion} from "../../config.json";

export async function getRefAccountTypes(){
    return await http.get(apiUrl + apiVersion + "/refAccountTypes/");
}

export async function getRefAccountType(id){
    return await http.get(apiUrl + apiVersion + "/refAccountType/" + id);
}

export async function getRefAccountTypeByCode(code){
    return await http.get(apiUrl + apiVersion + "/refAccountType?code=" + code);
}

export async function addRefAccountType(refAccountTypes){
    return await http.post(apiUrl + apiVersion + "/refAccountType", refAccountTypes);
}

export async function updateRefAccountType(refAccountTypes){
    return await http.put(apiUrl + apiVersion + "/refAccountType", refAccountTypes);
}

export async function deleteRefAccountType(id){
    return await http.delete(apiUrl + apiVersion + "/refAccountType/" + id);
}

export default {
    getRefAccountTypes,
    getRefAccountType,
    getRefAccountTypeByCode,
    addRefAccountType,
    updateRefAccountType,
    deleteRefAccountType
}