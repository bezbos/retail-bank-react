import http from "../httpService";
import {apiUrl, apiVersion} from "../../config.json";

export async function getRefTransactionTypes(){
    return await http.get(apiUrl + apiVersion + "/refTransactionTypes/");
}

export async function getRefTransactionType(id){
    return await http.get(apiUrl + apiVersion + "/refTransactionType/" + id);
}

export async function getRefTransactionTypeByDetails(code){
    return await http.get(apiUrl + apiVersion + "/refTransactionType?code=" + code);
}

export async function addRefTransactionType(refTransactionType){
    return await http.post(apiUrl + apiVersion + "/refTransactionType", refTransactionType);
}

export async function updateRefTransactionType(refTransactionType){
    return await http.put(apiUrl + apiVersion + "/refTransactionType", refTransactionType);
}

export async function deleteRefTransactionType(id){
    return await http.delete(apiUrl + apiVersion + "/refTransactionType/" + id);
}

export default {
    getRefTransactionTypes,
    getRefTransactionType,
    getRefTransactionTypeByDetails,
    addRefTransactionType,
    updateRefTransactionType,
    deleteRefTransactionType
}