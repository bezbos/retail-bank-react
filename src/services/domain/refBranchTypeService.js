import http from "../httpService";
import {apiUrl, apiVersion} from "../../config.json";

export async function getRefBranchTypes(){
    return await http.get(apiUrl + apiVersion + "/refBranchTypes/");
}

export async function getRefBranchType(id){
    return await http.get(apiUrl + apiVersion + "/refBranchType/" + id);
}

export async function getRefBranchTypeByCode(code){
    return await http.get(apiUrl + apiVersion + "/refBranchType?code=" + code);
}

export async function addRefBranchType(refBranchType){
    return await http.post(apiUrl + apiVersion + "/refBranchType", refBranchType);
}

export async function updateRefBranchType(refBranchType){
    return await http.put(apiUrl + apiVersion + "/refBranchType", refBranchType);
}

export async function deleteRefBranchType(id){
    return await http.delete(apiUrl + apiVersion + "/refBranchType/" + id);
}

export default {
    getRefBranchTypes,
    getRefBranchType,
    getRefBranchTypeByCode,
    addRefBranchType,
    updateRefBranchType,
    deleteRefBranchType
}