import {apiUrl, apiVersion} from '../../config.json';
/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import http from '../httpService';

/**
 * Retrieves all transaction types from an API endpoint.
 * @returns {Promise<*>}
 */
export async function getRefTransactionTypes() {
    return await http.get(apiUrl + apiVersion + '/refTransactionTypes/');
}

/**
 * Retrieves a single transaction type by <code>id</code> from an API endpoint.
 * @param id - Id of the transaction type we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getRefTransactionType(id) {
    return await http.get(apiUrl + apiVersion + '/refTransactionType/' + id);
}

/**
 * Retrieves a single transaction type by <code>code</code> from an API endpoint.
 * @param code - Code of the transaction type we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getRefTransactionTypeByDetails(code) {
    return await http.get(apiUrl + apiVersion + '/refTransactionType?code=' + code);
}

/**
 * Requests a transaction type to be added to an API endpoint.
 * @param refTransactionType - Transaction type we want to add.
 * @returns {Promise<*>}
 */
export async function addRefTransactionType(refTransactionType) {
    return await http.post(apiUrl + apiVersion + '/refTransactionType', refTransactionType);
}

/**
 * Requests a transaction type to be updated at an API endpoint.
 * @param refTransactionType - Transaction type we want to update.
 * @returns {Promise<*>}
 */
export async function updateRefTransactionType(refTransactionType) {
    return await http.put(apiUrl + apiVersion + '/refTransactionType', refTransactionType);
}

/**
 * Requests a transaction type to be deleted from an API endpoint.
 * @param id - Id of the transaction type we want to delete.
 * @returns {Promise<*>}
 */
export async function deleteRefTransactionType(id) {
    return await http.delete(apiUrl + apiVersion + '/refTransactionType/' + id);
}

export default {
    getRefTransactionTypes,
    getRefTransactionType,
    getRefTransactionTypeByDetails,
    addRefTransactionType,
    updateRefTransactionType,
    deleteRefTransactionType
}