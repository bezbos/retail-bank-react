import refTransactionTypeService from '../../services/domain/refTransactionTypeService';

//region API ENDPOINT TESTS
let unitTestRefTransactionType = null;

test('sends a GET request to localhost to get all refTransactionTypes and checks if status is "200 OK"',
    async () => {
        const {status} = await refTransactionTypeService.getRefTransactionTypes();

        expect(status).toBe(200);
    });

test('sends a GET request to localhost to get a single refTransactionType and checks if status is "200 OK"',
    async () => {
        const {status} = await refTransactionTypeService.getRefTransactionType(1);

        expect(status).toBe(200);
    });

test('sends a POST request to localhost to add a refTransactionType and checks if status is "201 CREATED"',
    async () => {
        const refTransactionType = {
            code: '00-UNIT-TEST',
            description: 'Unit Test',
            isDepositType: false,
            isWithdrawalType: false
        };
        const {status} = await refTransactionTypeService.addRefTransactionType(refTransactionType);

        // Arranges unit test refTransactionType for next unit tests.
        const {data} = await refTransactionTypeService.getRefTransactionTypeByDetails('00-UNIT-TEST');
        unitTestRefTransactionType = {
            id: data.id,
            code: '00-UNIT-TEST',
            description: 'Unit Test',
            isDepositType: false,
            isWithdrawalType: false
        };

        expect(status).toBe(201);
    });

test('sends a PUT request to localhost to update a refTransactionType and checks if status is "200 OK"',
    async () => {
        const refTransactionType = {
            id: unitTestRefTransactionType.id,
            code: '00-UT-UPDATE',
            description: 'Unit Test Update',
            isDepositType: false,
            isWithdrawalType: false
        };

        const {status} = await refTransactionTypeService.updateRefTransactionType(refTransactionType);

        expect(status).toBe(200);
    });

test('sends a DELETE request to localhost to delete a refTransactionType and checks if status is "204 NO CONTENT"',
    async () => {
        const {status} = await refTransactionTypeService.deleteRefTransactionType(unitTestRefTransactionType.id);

        expect(status).toBe(204);
    });
//endregion