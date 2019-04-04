import {apiUrl, apiVersion} from '../../config.json';
/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import http from '../httpService';

/**
 * Retrieves all branch types from an API endpoint.
 * @returns {Promise<*>}
 */
export async function getRefBranchTypes() {
    return await http.get(apiUrl + apiVersion + '/refBranchTypes/');
}

/**
 * Retrieves a single branch type by <code>id</code> from an API endpoint.
 * @param id - Id of the branch type we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getRefBranchType(id) {
    return await http.get(apiUrl + apiVersion + '/refBranchType/' + id);
}

/**
 * Retrieves a single branch type by <code>code</code> from an API endpoint.
 * @param code - Id of the branch type we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getRefBranchTypeByCode(code) {
    return await http.get(apiUrl + apiVersion + '/refBranchType?code=' + code);
}

/**
 * Requests a branch type to be added to an API endpoint.
 * @param refBranchType - Branch type we want to add.
 * @returns {Promise<*>}
 */
export async function addRefBranchType(refBranchType) {
    return await http.post(apiUrl + apiVersion + '/refBranchType', refBranchType);
}

/**
 * Requests a branch type to be updated at an API endpoint.
 * @param refBranchType - Branch type we want to update.
 * @returns {Promise<*>}
 */
export async function updateRefBranchType(refBranchType) {
    return await http.put(apiUrl + apiVersion + '/refBranchType', refBranchType);
}

/**
 * Requests a branch type to be deleted from an API endpoint.
 * @param id - Id of the branch type we want to delete.
 * @returns {Promise<*>}
 */
export async function deleteRefBranchType(id) {
    return await http.delete(apiUrl + apiVersion + '/refBranchType/' + id);
}

export default {
    getRefBranchTypes,
    getRefBranchType,
    getRefBranchTypeByCode,
    addRefBranchType,
    updateRefBranchType,
    deleteRefBranchType
}