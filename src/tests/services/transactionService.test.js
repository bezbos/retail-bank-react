import transactionService from '../../services/domain/transactionService';

//region API ENDPOINT TESTS
test('sends a GET request to localhost to get a range of transactions and checks if status is "200 OK"',
    async () => {
        const {status} = await transactionService.getTransactionsRange();

        expect(status).toBe(200);
    });

test('sends a GET request to localhost to get a single transaction and checks if status is "200 OK"',
    async () => {
        const {status} = await transactionService.getTransaction(1);

        expect(status).toBe(200);
    });

test('sends a POST request to localhost to add a transaction and checks if status is "201 CREATED"',
    async () => {
        const transaction = {
            account: {
                id: 1
            },
            merchant: {
                id: 1
            },
            type: {
                id: 1
            },
            date: '2019-01-21',
            amount: 123456789,
            details: 'Unit Test'
        };
        const {status} = await transactionService.addTransaction(transaction);

        expect(status).toBe(201);
    });
//endregion