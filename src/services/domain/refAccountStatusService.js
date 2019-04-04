/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import {apiUrl, apiVersion} from '../../config.json';
import http from '../httpService';

/**
 * Retrieves all account statuses from an API endpoint.
 * @returns {Promise<*>}
 */
export async function getRefAccountStatuses() {
    return await http.get(apiUrl + apiVersion + '/refAccountStatuses/');
}

/**
 * Retrieves a single account status by <code>id</code> from an API endpoint.
 * @param id - Id of the account status we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getRefAccountStatus(id) {
    return await http.get(apiUrl + apiVersion + '/refAccountStatus/' + id);
}

/**
 * Retrieves a single account status by <code>code</code> from an API endpoint.
 * @param code - Code of the account status we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getRefAccountStatusByCode(code) {
    return await http.get(apiUrl + apiVersion + '/refAccountStatus?code=' + code);
}

/**
 * Requests an account status to be added to an API endpoint.
 * @param refAccountStatus - Account status we want to add.
 * @returns {Promise<*>}
 */
export async function addRefAccountStatus(refAccountStatus) {
    return await http.post(apiUrl + apiVersion + '/refAccountStatus', refAccountStatus);
}

/**
 * Requests an account status to be updated at an API endpoint.
 * @param refAccountStatus - Account status we want to update.
 * @returns {Promise<*>}
 */
export async function updateRefAccountStatus(refAccountStatus) {
    return await http.put(apiUrl + apiVersion + '/refAccountStatus', refAccountStatus);
}

/**
 * Requests an account status to be deleted from an API endpoint.
 * @param id - Id of the account status we want to delete.
 * @returns {Promise<*>}
 */
export async function deleteRefAccountStatus(id) {
    return await http.delete(apiUrl + apiVersion + '/refAccountStatus/' + id);
}

export default {
    getRefAccountStatuses,
    getRefAccountStatus,
    getRefAccountStatusByCode,
    addRefAccountStatus,
    updateRefAccountStatus,
    deleteRefAccountStatus
}