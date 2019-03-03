import http from "../httpService";
import {apiUrl, apiVersion} from "../../config.json";

export async function getBanksRange(pageIndex = 0){
    return await http.get(apiUrl + apiVersion + "/banks/" + pageIndex);
}

export async function getBank(id){
    return await http.get(apiUrl + apiVersion + "/bank/" + id);
}

export async function getBankByDetails(details){
    return await http.get(apiUrl + apiVersion + "/bank?details=" + details);
}

export async function addBank(bank){
    return await http.post(apiUrl + apiVersion + "/bank", bank);
}

export async function updateBank(bank){
    return await http.put(apiUrl + apiVersion + "/bank", bank);
}

export async function deleteBank(id){
    return await http.delete(apiUrl + apiVersion + "/bank/" + id);
}

export default {
    getBanksRange,
    getBank,
    getBankByDetails,
    addBank,
    updateBank,
    deleteBank
}