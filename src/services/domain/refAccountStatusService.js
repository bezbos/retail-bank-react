import http from "../httpService";
import {apiUrl, apiVersion} from "../../config.json";

export async function getRefAccountStatuses(){
    return await http.get(apiUrl + apiVersion + "/refAccountStatuses/");
}

export async function getRefAccountStatus(id){
    return await http.get(apiUrl + apiVersion + "/refAccountStatus/" + id);
}

export async function getRefAccountStatusByCode(code){
    return await http.get(apiUrl + apiVersion + "/refAccountStatus?code=" + code);
}

export async function addRefAccountStatus(refAccountStatus){
    return await http.post(apiUrl + apiVersion + "/refAccountStatus", refAccountStatus);
}

export async function updateRefAccountStatus(refAccountStatus){
    return await http.put(apiUrl + apiVersion + "/refAccountStatus", refAccountStatus);
}

export async function deleteRefAccountStatus(id){
    return await http.delete(apiUrl + apiVersion + "/refAccountStatus/" + id);
}

export default {
    getRefAccountStatuses,
    getRefAccountStatus,
    getRefAccountStatusByCode,
    addRefAccountStatus,
    updateRefAccountStatus,
    deleteRefAccountStatus
}