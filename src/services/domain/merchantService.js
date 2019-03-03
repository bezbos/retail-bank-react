import http from "../httpService";
import {apiUrl, apiVersion} from "../../config.json";

export async function getMerchantsRange(pageIndex = 0){
    return await http.get(apiUrl + apiVersion + "/merchants/" + pageIndex);
}

export async function getMerchant(id){
    return await http.get(apiUrl + apiVersion + "/merchant/" + id);
}

export async function getMerchantByDetails(details){
    return await http.get(apiUrl + apiVersion + "/merchant?details=" + details);
}

export async function addMerchant(merchant){
    return await http.post(apiUrl + apiVersion + "/merchant", merchant);
}

export async function updateMerchant(merchant){
    return await http.put(apiUrl + apiVersion + "/merchant", merchant);
}

export async function deleteMerchant(id){
    return await http.delete(apiUrl + apiVersion + "/merchant/" + id);
}

export default {
    getMerchantsRange,
    getMerchant,
    getMerchantByDetails,
    addMerchant,
    updateMerchant,
    deleteMerchant
}