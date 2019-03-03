import http from "../httpService";
import {apiUrl, apiVersion} from "../../config.json";

export async function getTransactionsRange(pageIndex = 0){
    return await http.get(apiUrl + apiVersion + "/transactions/" + pageIndex);
}

export async function getTransaction(id){
    return await http.get(apiUrl + apiVersion + "/transaction/" + id);
}

export async function getTransactionByDetails(details){
    return await http.get(apiUrl + apiVersion + "/transaction?details=" + details);
}

export async function addTransaction(transaction){
    return await http.post(apiUrl + apiVersion + "/transaction", transaction);
}

export async function updateTransaction(transaction){
    return await http.put(apiUrl + apiVersion + "/transaction", transaction);
}

export async function deleteTransaction(id){
    return await http.delete(apiUrl + apiVersion + "/transaction/" + id);
}

export default {
    getTransactionsRange,
    getTransaction,
    getTransactionByDetails,
    addTransaction,
    updateTransaction,
    deleteTransaction
}