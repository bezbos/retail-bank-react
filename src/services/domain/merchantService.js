import {apiUrl, apiVersion} from '../../config.json';
/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import http from '../httpService';

/**
 * Retrieves a range of merchants from an API endpoint.
 * @param pageIndex - Default value is 0.
 * @returns {Promise<*>}
 */
export async function getMerchantsRange(pageIndex = 0) {
    return await http.get(apiUrl + apiVersion + '/merchants/' + pageIndex);
}

/**
 * Retrieves a single merchant by <code>id</code> from an API endpoint.
 * @param id - Id of the merchant we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getMerchant(id) {
    return await http.get(apiUrl + apiVersion + '/merchant/' + id);
}

/**
 * Retrieves a single merchant by <code>details</code> from an API endpoint.
 * @param details - Id of the merchant we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getMerchantByDetails(details) {
    return await http.get(apiUrl + apiVersion + '/merchant?details=' + details);
}

/**
 * Retrieves an array of branches that contain the argument substring in their <code>details</code> property.
 * @param details - Substring that we check for in a <code>details</code> string.
 * @returns {Promise<*>}
 */
export async function getMerchantsByDetails(details) {
    return await http.get(apiUrl + apiVersion + '/merchants?details=' + details);
}

/**
 * Requests a merchant to be added to an API endpoint.
 * @param merchant - Merchant we want to add.
 * @returns {Promise<*>}
 */
export async function addMerchant(merchant) {
    return await http.post(apiUrl + apiVersion + '/merchant', merchant);
}

/**
 * Requests a merchant to be updated at an API endpoint.
 * @param merchant - Merchant we want to update.
 * @returns {Promise<*>}
 */
export async function updateMerchant(merchant) {
    return await http.put(apiUrl + apiVersion + '/merchant', merchant);
}

/**
 * Requests a merchant to be deleted from an API endpoint.
 * @param id - Id of the merchant we want to delete.
 * @returns {Promise<*>}
 */
export async function deleteMerchant(id) {
    return await http.delete(apiUrl + apiVersion + '/merchant/' + id);
}

export default {
    getMerchantsRange,
    getMerchant,
    getMerchantByDetails,
    getMerchantsByDetails,
    addMerchant,
    updateMerchant,
    deleteMerchant
}