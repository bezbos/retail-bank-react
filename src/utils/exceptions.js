/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import {toast} from 'react-toastify';

/**
 * @description We use this function in <code>catch</code> blocks
 * to showHttpException a user friendly message appropriate to the response code.
 * @param exception - HTTP exception object.
 * @param customExceptionMessage - Optional exception message that will be logged in the console.
 * @param customToastMessage - Optional toast messages that replace the default message.
 * @returns {void}
 */
function showHttpException(exception, customExceptionMessage = '', customToastMessage) {

    let _exceptionAsNumber;

    // We check if the exception argument is a number
    if (typeof exception === 'number') {
        _exceptionAsNumber = exception;

    } else {

        // We check if exception has a [response] property.
        if (exception.response) {

            // We check if exception [response] property has children properties [data] and [status].
            if (!(exception.response.data !== null && exception.response.status)) {
                return;
            }
        }
    }

    // If the exception argument is a number we will use that instead of
    // [response.status] and [response.data] properties that are usually part of the object.
    const actualExceptionStatus = _exceptionAsNumber || exception.response.status;
    const actualExceptionData = _exceptionAsNumber || exception.response.data;

// First we log the exception to the console.
    console.error(customExceptionMessage, actualExceptionData);

// Then we show a user friendly toast error message.
    switch (actualExceptionStatus) {
        case 400:
            toast.error(`${customToastMessage || 'Something went wrong.'} (${actualExceptionStatus})`);
            break;
        case 401:
            toast.warn(`${customToastMessage || 'You must login to proceed.'} (${actualExceptionStatus})`);
            break;
        case 403:
            toast.warn(`${customToastMessage || 'You are not authorized to do that.'} (${actualExceptionStatus})`);
            break;
        case 404:
            toast.error(`${customToastMessage || 'This resource could not be found.'} (${actualExceptionStatus})`);
            break;
        case 405:
            toast.warn(`${customToastMessage || 'That action is disabled or not allowed.'} (${actualExceptionStatus})`);
            break;
        case 408:
            toast.error(`${customToastMessage || 'Request timeout.'} (${actualExceptionStatus})`);
            break;
        case 413:
            toast.error(`${customToastMessage || 'Resource too large.'} (${actualExceptionStatus})`);
            break;
        case 414:
            toast.error(`${customToastMessage || 'The URI is too long.'} (${actualExceptionStatus})`);
            break;
        case 415:
            toast.error(`${customToastMessage || 'Unsupported media type.'} (${actualExceptionStatus})`);
            break;
        case 429:
            toast.error(`${customToastMessage || 'Too many requests.'} (${actualExceptionStatus})`);
            break;
        case 500:
            toast.error(`${customToastMessage || 'Internal server error.'} (${actualExceptionStatus})`);
            break;
        default:
            toast.error(`${customToastMessage || 'Something went wrong.'} (${actualExceptionStatus})`);
            return;
    }
}

export default {
    showHttpException
}