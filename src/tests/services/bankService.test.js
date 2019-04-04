import bankService from '../../services/domain/bankService';

//region API ENDPOINT TESTS
let unitTestBank = null;

test('sends a GET request to localhost to get a range of banks and checks if status is "200 OK"',
    async () => {
        const {status} = await bankService.getBanksRange();

        expect(status).toBe(200);
    });

test('sends a GET request to localhost to get a single bank and checks if status is "200 OK"',
    async () => {
        const {status} = await bankService.getBank(1);

        expect(status).toBe(200);
    });

test('sends a POST request to localhost to add a bank and checks if status is "201 CREATED"',
    async () => {
        const bank = {details: 'Unit Test'};
        const {status} = await bankService.addBank(bank);

        // Arranges unit test bank for next unit tests.
        const {data} = await bankService.getBankByDetails('Unit Test');
        unitTestBank = {id: data.id, details: data.details};

        expect(status).toBe(201);
    });

test('sends a PUT request to localhost to update a bank and checks if status is "200 OK"',
    async () => {
        const bank = {id: unitTestBank.id, details: 'Unit Test Updated'};

        const {status} = await bankService.updateBank(bank);

        expect(status).toBe(200);
    });

test('sends a DELETE request to localhost to delete a bank and checks if status is "204 NO CONTENT"',
    async () => {
        const {status} = await bankService.deleteBank(unitTestBank.id);

        expect(status).toBe(204);
    });
//endregion