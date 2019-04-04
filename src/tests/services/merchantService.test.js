import merchantService from '../../services/domain/merchantService';

//region API ENDPOINT TESTS
let unitTestMerchant = null;

test('sends a GET request to localhost to get a range of merchants and checks if status is "200 OK"',
    async () => {
        const {status} = await merchantService.getMerchantsRange();

        expect(status).toBe(200);
    });

test('sends a GET request to localhost to get a single merchant and checks if status is "200 OK"',
    async () => {
        const {status} = await merchantService.getMerchant(1);

        expect(status).toBe(200);
    });

test('sends a POST request to localhost to add a merchant and checks if status is "201 CREATED"',
    async () => {
        const merchant = {details: 'Unit Test'};
        const {status} = await merchantService.addMerchant(merchant);

        // Arranges unit test merchant for next unit tests.
        const {data} = await merchantService.getMerchantByDetails('Unit Test');
        unitTestMerchant = {id: data.id, details: data.details};

        expect(status).toBe(201);
    });

test('sends a PUT request to localhost to update a merchant and checks if status is "200 OK"',
    async () => {
        const merchant = {id: unitTestMerchant.id, details: 'Unit Test Updated'};

        const {status} = await merchantService.updateMerchant(merchant);

        expect(status).toBe(200);
    });

test('sends a DELETE request to localhost to delete a merchant and checks if status is "204 NO CONTENT"',
    async () => {
        const {status} = await merchantService.deleteMerchant(unitTestMerchant.id);

        expect(status).toBe(204);
    });
//endregion