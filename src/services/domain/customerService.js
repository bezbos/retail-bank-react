import {apiUrl, apiVersion} from '../../config.json';
/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import http from '../httpService';

/**
 * Retrieves a range of customers from an API endpoint.
 * @param pageIndex - Default value is 0.
 * @returns {Promise<*>}
 */
export async function getCustomersRange(pageIndex = 0) {
    return await http.get(apiUrl + apiVersion + '/customers/' + pageIndex);
}

/**
 * Retrieves a single customer by <code>id</code> from an API endpoint.
 * @param id - Id of the customer we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getCustomer(id) {
    return await http.get(apiUrl + apiVersion + '/customer/' + id);
}

/**
 * Retrieves a single branch by <code>personalDetails</code> from an API endpoint.
 * @param personalDetails - Personal details of the customer we want to retrieve.
 * @returns {Promise<*>}
 */
export async function getCustomerByPersonalDetails(personalDetails) {
    return await http.get(apiUrl + apiVersion + '/customer?personalDetails=' + personalDetails);
}

/**
 * Retrieves an array of customers that contain the argument substring in their <code>personalDetails</code> property.
 * @param personalDetails - Substring that we check for in a <code>personalDetails</code> string.
 * @returns {Promise<*>}
 */
export async function getCustomersByPersonalDetails(personalDetails) {
    return await http.get(apiUrl + apiVersion + '/customers?personalDetails=' + personalDetails);
}

/**
 * Requests a customer to be added to an API endpoint.
 * @param customer - Customer we want to add.
 * @returns {Promise<*>}
 */
export async function addCustomer(customer) {
    return await http.post(apiUrl + apiVersion + '/customer', customer);
}

/**
 * Requests a customer to be updated at an API endpoint.
 * @param customer - Customer we want to update.
 * @returns {Promise<*>}
 */
export async function updateCustomer(customer) {
    return await http.put(apiUrl + apiVersion + '/customer', customer);
}

/**
 * Requests a customer to be deleted from an API endpoint.
 * @param id - Id of the customer we want to delete.
 * @returns {Promise<*>}
 */
export async function deleteCustomer(id) {
    return await http.delete(apiUrl + apiVersion + '/customer/' + id);
}

export default {
    getCustomersRange,
    getCustomer,
    getCustomerByPersonalDetails,
    getCustomersByPersonalDetails,
    addCustomer,
    updateCustomer,
    deleteCustomer
}