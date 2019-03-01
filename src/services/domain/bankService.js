import http from "../httpService";
import {apiUrl, apiVersion} from "../../config.json";

export async function getBanksRange(pageIndex = 0){
    return await http.get(apiUrl + apiVersion + "/banks/" + pageIndex);
}

export async function addBank(bank){
    return await http.post(apiUrl + apiVersion + "/bank", bank);
}

export async function updateBank(bank){
    return await http.put(apiUrl + apiVersion + "/bank", bank);
}

export async function deleteBank(id){
    return await http.put(apiUrl + apiVersion + "/bank/" + id);
}

export default {
    getBanksRange,
    addBank,
    updateBank,
    deleteBank
}