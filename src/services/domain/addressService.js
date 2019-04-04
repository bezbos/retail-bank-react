import {apiUrl, apiVersion} from '../../config.json';
/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import http from '../httpService';

/**
 * Retrieves a range of addresses from an API endpoint.
 * @param pageIndex - Default value is 0.
 * @returns {Promise<*>}
 */
export async function getAddressesRange(pageIndex = 0) {
    return await http.get(apiUrl + apiVersion + '/addresses/' + pageIndex);
}

/**
 * Retrieves a single address by <code>id</code> from an API endpoint.
 * @param id - Id of the address we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getAddress(id) {
    return await http.get(apiUrl + apiVersion + '/address/' + id);
}

/**
 * Retrieves a single address by <code>line1</code> from an API endpoint.
 * @param line1 - line1 of the address we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getAddressByLine1(line1) {
    return await http.get(apiUrl + apiVersion + '/address?line1=' + line1);
}

/**
 * Retrieves an array of addresses that contain the argument substring in their <code>line1</code> property.
 * @param line1 - Substring that we check for in a <code>line1</code> string.
 * @returns {Promise<*>}
 */
export async function getAddressesByLine1(line1) {
    return await http.get(apiUrl + apiVersion + '/addresses?line1=' + line1);
}

/**
 * Requests an address to be added to an API endpoint.
 * @param address - Address we want to add.
 * @returns {Promise<*>}
 */
export async function addAddress(address) {
    return await http.post(apiUrl + apiVersion + '/address', address);
}

/**
 * Requests an address to be updated at an API endpoint.
 * @param address - Address we want to update.
 * @returns {Promise<*>}
 */
export async function updateAddress(address) {
    return await http.put(apiUrl + apiVersion + '/address', address);
}

/**
 * Requests an address to be deleted from an API endpoint.
 * @param id - Id of the address we want to delete.
 * @returns {Promise<*>}
 */
export async function deleteAddress(id) {
    return await http.delete(apiUrl + apiVersion + '/address/' + id);
}

export default {
    getAddressesRange,
    getAddress,
    getAddressByLine1,
    getAddressesByLine1,
    addAddress,
    updateAddress,
    deleteAddress
}