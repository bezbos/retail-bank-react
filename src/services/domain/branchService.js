import {apiUrl, apiVersion} from '../../config.json';
/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import http from '../httpService';

/**
 * Retrieves a range of branches from an API endpoint.
 * @param pageIndex - Default value is 0.
 * @returns {Promise<*>}
 */
export async function getBranchesRange(pageIndex = 0) {
    return await http.get(apiUrl + apiVersion + '/branches/' + pageIndex);
}

/**
 * Retrieves a single branch by <code>id</code> from an API endpoint.
 * @param id - Id of the bank we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getBranch(id) {
    return await http.get(apiUrl + apiVersion + '/branch/' + id);
}

/**
 * Retrieves a single branch by <code>details</code> from an API endpoint.
 * @param details - Id of the branch we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getBranchByDetails(details) {
    return await http.get(apiUrl + apiVersion + '/branch?details=' + details);
}

/**
 * Retrieves an array of branches that contain the argument substring in their <code>details</code> property.
 * @param details - Substring that we check for in a <code>details</code> string.
 * @returns {Promise<*>}
 */
export async function getBranchesByDetails(details) {
    return await http.get(apiUrl + apiVersion + '/branches?details=' + details);
}

/**
 * Requests a branch to be added to an API endpoint.
 * @param branch - Branch we want to add.
 * @returns {Promise<*>}
 */
export async function addBranch(branch) {
    return await http.post(apiUrl + apiVersion + '/branch', branch);
}

/**
 * Requests a branch to be updated at an API endpoint.
 * @param branch - Branch we want to update.
 * @returns {Promise<*>}
 */
export async function updateBranch(branch) {
    return await http.put(apiUrl + apiVersion + '/branch', branch);
}

/**
 * Requests a branch to be deleted from an API endpoint.
 * @param id - Id of the branch we want to delete.
 * @returns {Promise<*>}
 */
export async function deleteBranch(id) {
    return await http.delete(apiUrl + apiVersion + '/branch/' + id);
}

export default {
    getBranchesRange,
    getBranch,
    getBranchByDetails,
    getBranchesByDetails,
    addBranch,
    updateBranch,
    deleteBranch
}