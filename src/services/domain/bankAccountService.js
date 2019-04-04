import {apiUrl, apiVersion} from '../../config.json';
/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import http from '../httpService';

/**
 * Retrieves a range of bank accounts from an API endpoint.
 * @param pageIndex - Default value is 0.
 * @returns {Promise<*>}
 */
export async function getBankAccountsRange(pageIndex = 0) {
    return await http.get(apiUrl + apiVersion + '/bankAccounts/' + pageIndex);
}

/**
 * Retrieves a single bank account by <code>id</code> from an API endpoint.
 * @param id - Id of the bank account we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getBankAccount(id) {
    return await http.get(apiUrl + apiVersion + '/bankAccount/' + id);
}

/**
 * Retrieves a single bank account by <code>details</code> from an API endpoint.
 * @param details - Details of the bank account we want to retrieve
 * @returns {Promise<*>}
 */
export async function getBankAccountByDetails(details) {
    return await http.get(apiUrl + apiVersion + '/bankAccount?details=' + details);
}

/**
 * Retrieves a bank accounts by <code>details</code> from an API endpoint.
 * @param details - Details of the bank account we want to retrieve
 * @returns {Promise<*>}
 */
export async function getBankAccountsByDetails(details) {
    return await http.get(apiUrl + apiVersion + '/bankAccounts?details=' + details);
}

/**
 * Requests a bank account to be added to an API endpoint.
 * @param bankAccount - Bank account we want to add.
 * @returns {Promise<*>}
 */
export async function addBankAccount(bankAccount) {
    return await http.post(apiUrl + apiVersion + '/bankAccount', bankAccount);
}

/**
 * Requests a bank account to be updated at an API endpoint.
 * @param bankAccount - Bank account we want to update.
 * @returns {Promise<*>}
 */
export async function updateBankAccount(bankAccount) {
    return await http.put(apiUrl + apiVersion + '/bankAccount', bankAccount);
}

/**
 * Requests a bank account to be deleted from an API endpoint.
 * @param id - Id of the bank account we want to delete.
 * @returns {Promise<*>}
 */
export async function deleteBankAccount(id) {
    return await http.delete(apiUrl + apiVersion + '/bankAccount/' + id);
}

export default {
    getBankAccountsRange,
    getBankAccount,
    getBankAccountByDetails,
    getBankAccountsByDetails,
    addBankAccount,
    updateBankAccount,
    deleteBankAccount
}