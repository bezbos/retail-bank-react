import {apiUrl, apiVersion} from '../../config.json';
/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import http from '../httpService';

/**
 * Retrieves all account types from an API endpoint.
 * @returns {Promise<*>}
 */
export async function getRefAccountTypes() {
    return await http.get(apiUrl + apiVersion + '/refAccountTypes/');
}

/**
 * Retrieves a single account type by <code>id</code> from an API endpoint.
 * @param id - Id of the account type we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getRefAccountType(id) {
    return await http.get(apiUrl + apiVersion + '/refAccountType/' + id);
}

/**
 * Retrieves a single account type by <code>code</code> from an API endpoint.
 * @param code - Code of the account type we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getRefAccountTypeByCode(code) {
    return await http.get(apiUrl + apiVersion + '/refAccountType?code=' + code);
}

/**
 * Requests an account type to be added to an API endpoint.
 * @param refAccountType - Account type we want to add.
 * @returns {Promise<*>}
 */
export async function addRefAccountType(refAccountType) {
    return await http.post(apiUrl + apiVersion + '/refAccountType', refAccountType);
}

/**
 * Requests an account type to be updated at an API endpoint.
 * @param refAccountType - Account type we want to update.
 * @returns {Promise<*>}
 */
export async function updateRefAccountType(refAccountType) {
    return await http.put(apiUrl + apiVersion + '/refAccountType', refAccountType);
}

/**
 * Requests an account type to be deleted from an API endpoint.
 * @param id - Id of the account type we want to delete.
 * @returns {Promise<*>}
 */
export async function deleteRefAccountType(id) {
    return await http.delete(apiUrl + apiVersion + '/refAccountType/' + id);
}

export default {
    getRefAccountTypes,
    getRefAccountType,
    getRefAccountTypeByCode,
    addRefAccountType,
    updateRefAccountType,
    deleteRefAccountType
}