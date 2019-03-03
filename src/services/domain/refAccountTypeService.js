import http from "../httpService";
import {apiUrl, apiVersion} from "../../config.json";

export async function getRefAccountTypes(){
    return await http.get(apiUrl + apiVersion + "/refAccountTypes/");
}

export async function getRefAccountType(id){
    return await http.get(apiUrl + apiVersion + "/refAccountTypes/" + id);
}

export async function getRefAccountTypeByCode(code){
    return await http.get(apiUrl + apiVersion + "/refAccountTypes?code=" + code);
}

export async function addRefAccountType(refAccountTypes){
    return await http.post(apiUrl + apiVersion + "/refAccountTypes", refAccountTypes);
}

export async function updateRefAccountType(refAccountTypes){
    return await http.put(apiUrl + apiVersion + "/refAccountTypes", refAccountTypes);
}

export async function deleteRefAccountType(id){
    return await http.delete(apiUrl + apiVersion + "/refAccountTypes/" + id);
}

export default {
    getRefAccountTypes,
    getRefAccountType,
    getRefAccountTypeByCode,
    addRefAccountType,
    updateRefAccountType,
    deleteRefAccountType
}