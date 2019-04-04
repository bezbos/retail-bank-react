import {apiUrl, apiVersion} from '../../config.json';
/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import http from '../httpService';

/**
 * Retrieves a range of transactions from an API endpoint.
 * @param pageIndex - Default value is 0.
 * @returns {Promise<*>}
 */
export async function getTransactionsRange(pageIndex = 0) {
    return await http.get(apiUrl + apiVersion + '/transactions/' + pageIndex);
}

/**
 * Retrieves a single transaction by <code>id</code> from an API endpoint.
 * @param id - Id of the transaction we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getTransaction(id) {
    return await http.get(apiUrl + apiVersion + '/transaction/' + id);
}

/**
 * Retrieves a single transaction by <code>details</code> from an API endpoint.
 * @param details - Details of the transaction we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getTransactionByDetails(details) {
    return await http.get(apiUrl + apiVersion + '/transaction?details=' + details);
}

/**
 * Requests a transaction to be added to an API endpoint.
 * @param transaction - Transaction we want to add.
 * @returns {Promise<*>}
 */
export async function addTransaction(transaction) {
    return await http.post(apiUrl + apiVersion + '/transaction', transaction);
}

/**
 * Requests a payment to be processed to an API endpoint.
 * @param transaction - Transaction we want to add.
 * @returns {Promise<*>}
 */
export async function createPayment(transaction) {
    return await http.post(apiUrl + apiVersion + '/transaction', transaction);
}

/**
 * Requests a withdrawal to be processed to an API endpoint.
 * @param transaction - Transaction we want to add.
 * @returns {Promise<*>}
 */
export async function createWithdrawal(transaction) {
    return await http.post(apiUrl + apiVersion + '/transaction/withdrawal', transaction);
}

/**
 * Requests a deposit to be processed to an API endpoint.
 * @param transaction - Transaction we want to add.
 * @returns {Promise<*>}
 */
export async function createDeposit(transaction) {
    return await http.post(apiUrl + apiVersion + '/transaction/deposit', transaction);
}

export default {
    getTransactionsRange,
    getTransaction,
    addTransaction,
    createPayment,
    createWithdrawal,
    createDeposit
}