import {apiUrl, apiVersion} from '../../config.json';
/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import http from '../httpService';

/**
 * Retrieves a range of banks from an API endpoint.
 * @param pageIndex - Default value is 0.
 * @returns {Promise<*>}
 */
export async function getBanksRange(pageIndex = 0) {
    return await http.get(apiUrl + apiVersion + '/banks/' + pageIndex);
}

/**
 * Retrieves a single bank by <code>id</code> from an API endpoint.
 * @param id - Id of the bank we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getBank(id) {
    return await http.get(apiUrl + apiVersion + '/bank/' + id);
}

/**
 * Retrieves a single bank by <code>details</code> from an API endpoint.
 * @param details - Details of the bank we want to retrieve
 * @returns {Promise<*>}
 */
export async function getBankByDetails(details) {
    return await http.get(apiUrl + apiVersion + '/bank?details=' + details);
}

/**
 * Retrieves an array of banks that contain the argument substring in their <code>details</code> property.
 * @param details - Substring that we check for in a <code>details</code> string.
 * @returns {Promise<*>}
 */
export async function getBanksByDetails(details) {
    return await http.get(apiUrl + apiVersion + '/banks?details=' + details);
}

/**
 * Requests a bank to be added to an API endpoint.
 * @param bank - Bank we want to add.
 * @returns {Promise<*>}
 */
export async function addBank(bank) {
    return await http.post(apiUrl + apiVersion + '/bank', bank);
}

/**
 * Requests a bank to be updated at an API endpoint.
 * @param bank - Bank we want to update.
 * @returns {Promise<*>}
 */
export async function updateBank(bank) {
    return await http.put(apiUrl + apiVersion + '/bank', bank);
}

/**
 * Requests a bank to be deleted from an API endpoint.
 * @param id - Id of the bank we want to delete.
 * @returns {Promise<*>}
 */
export async function deleteBank(id) {
    return await http.delete(apiUrl + apiVersion + '/bank/' + id);
}

export default {
    getBanksRange,
    getBank,
    getBankByDetails,
    getBanksByDetails,
    addBank,
    updateBank,
    deleteBank
}