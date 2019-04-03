/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */

/**
 * @description Turns the first character in a string to lower case.
 * @param str - String that will have it's first character turned to lower case.
 * @returns {string}
 */
export function firstToLowerCase(str) {
    return str.substr(0, 1).toLowerCase() + str.substr(1);
}

/**
 * @description Removes all whitespace in a string.
 * @param str - String that will have it's whitespaces removed.
 * @returns {string}
 */
export function removeWhitespace(str) {
    return str.replace(/\s/g, '');
}