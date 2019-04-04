import addressService from '../../services/domain/addressService';

//region API ENDPOINT TESTS
let unitTestAddress = null;

test('sends a GET request to localhost to get a range of addresses and checks if status is "200 OK"',
    async () => {
        const {status} = await addressService.getAddressesRange();

        expect(status).toBe(200);
    });

test('sends a GET request to localhost to get a single address and checks if status is "200 OK"',
    async () => {
        const {status} = await addressService.getAddress(1);

        expect(status).toBe(200);
    });

test('sends a POST request to localhost to add a address and checks if status is "201 CREATED"',
    async () => {
        const address = {line1: 'Unit Test'};
        const {status} = await addressService.addAddress(address);

        // Arranges unit test address for next unit tests.
        const {data} = await addressService.getAddressByLine1('Unit Test');
        unitTestAddress = {id: data.id, line1: data.line1};

        expect(status).toBe(201);
    });

test('sends a PUT request to localhost to update a address and checks if status is "200 OK"',
    async () => {
        const address = {id: unitTestAddress.id, line1: 'Unit Test Updated'};

        const {status} = await addressService.updateAddress(address);

        expect(status).toBe(200);
    });

test('sends a DELETE request to localhost to delete a address and checks if status is "204 NO CONTENT"',
    async () => {
        const {status} = await addressService.deleteAddress(unitTestAddress.id);

        expect(status).toBe(204);
    });
//endregion