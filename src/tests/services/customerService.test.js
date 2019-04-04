import customerService from '../../services/domain/customerService';

//region API ENDPOINT TESTS
let unitTestCustomer = null;

test('sends a GET request to localhost to get a range of customers and checks if status is "200 OK"',
    async () => {
        const {status} = await customerService.getCustomersRange();

        expect(status).toBe(200);
    });

test('sends a GET request to localhost to get a single customer and checks if status is "200 OK"',
    async () => {
        const {status} = await customerService.getCustomer(1);

        expect(status).toBe(200);
    });

test('sends a POST request to localhost to add a customer and checks if status is "201 CREATED"',
    async () => {
        const customer = {
            address: {
                id: 1
            },
            branch: {
                id: 1
            },
            personalDetails: 'Unit Test',
            contactDetails: 'Unit Test'
        };

        const {status} = await customerService.addCustomer(customer);

        // Arranges unit test customer for next unit tests.
        const {data} = await customerService.getCustomerByPersonalDetails('Unit Test');
        unitTestCustomer = {id: data.id, details: data.details};

        expect(status).toBe(201);
    });

test('sends a PUT request to localhost to update a customer and checks if status is "200 OK"',
    async () => {
        const customer = {
            id: unitTestCustomer.id,
            address: {
                id: 1
            },
            branch: {
                id: 1
            },
            personalDetails: 'Unit Test',
            contactDetails: 'Unit Test'
        };

        const {status} = await customerService.updateCustomer(customer);

        expect(status).toBe(200);
    });

test('sends a DELETE request to localhost to delete a customer and checks if status is "204 NO CONTENT"',
    async () => {
        const {status} = await customerService.deleteCustomer(unitTestCustomer.id);

        expect(status).toBe(204);
    });
//endregion