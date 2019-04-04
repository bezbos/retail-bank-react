import bankAccountService from '../../services/domain/bankAccountService';

//region API ENDPOINT TESTS
let unitTestBankAccount = null;

test('sends a GET request to localhost to get a range of bank account accounts and checks if status is "200 OK"',
    async () => {
        const {status} = await bankAccountService.getBankAccountsRange();

        expect(status).toBe(200);
    });

test('sends a GET request to localhost to get a single bank account and checks if status is "200 OK"',
    async () => {
        const {status} = await bankAccountService.getBankAccount(1);

        expect(status).toBe(200);
    });

test('sends a POST request to localhost to add a bank account and checks if status is "201 CREATED"',
    async () => {
        const bankAccount = {
            status: {
                id: 1
            },
            type: {
                id: 1
            },
            customer: {
                id: 1
            },
            balance: 123456789,
            details: 'Unit Test'
        };

        const {status} = await bankAccountService.addBankAccount(bankAccount);

        // Arranges unit test bank account for next unit tests.
        const {data} = await bankAccountService.getBankAccountByDetails('Unit Test');
        unitTestBankAccount = {id: data.id, details: data.details};

        expect(status).toBe(201);
    });

test('sends a PUT request to localhost to update a bank account and checks if status is "200 OK"',
    async () => {
        const bankAccount = {
            id: unitTestBankAccount.id,
            status: {
                id: 2
            },
            type: {
                id: 2
            },
            customer: {
                id: 2
            },
            balance: 987654321,
            details: 'Unit Test Updated'
        };

        const {status} = await bankAccountService.updateBankAccount(bankAccount);

        expect(status).toBe(200);
    });

test('sends a DELETE request to localhost to delete a bank account and checks if status is "204 NO CONTENT"',
    async () => {
        const {status} = await bankAccountService.deleteBankAccount(unitTestBankAccount.id);

        expect(status).toBe(204);
    });
//endregion