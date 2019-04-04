import refAccountTypeService from '../../services/domain/refAccountTypeService';

//region API ENDPOINT TESTS
let unitTestRefAccountType = null;

test('sends a GET request to localhost to get a range of refAccountTypes and checks if status is "200 OK"',
    async () => {
        const {status} = await refAccountTypeService.getRefAccountTypes();

        expect(status).toBe(200);
    });

test('sends a GET request to localhost to get a single refAccountType and checks if status is "200 OK"',
    async () => {
        const {status} = await refAccountTypeService.getRefAccountType(1);

        expect(status).toBe(200);
    });

test('sends a POST request to localhost to add a refAccountType and checks if status is "201 CREATED"',
    async () => {
        const refAccountType = {
            code: '00-UNIT-TEST',
            description: 'Unit Test',
            isCheckingType: false,
            isSavingsType: false,
            isCertificateOfDepositType: false,
            isMoneyMarketType: false,
            isIndividualRetirementType: false
        };
        const {status} = await refAccountTypeService.addRefAccountType(refAccountType);

        // Arranges unit test refAccountType for next unit tests.
        const {data} = await refAccountTypeService.getRefAccountTypeByCode('00-UNIT-TEST');
        unitTestRefAccountType = {id: data.id, details: data.details};

        expect(status).toBe(201);
    });

test('sends a PUT request to localhost to update a refAccountType and checks if status is "200 OK"',
    async () => {
        const refAccountType = {
            id: unitTestRefAccountType.id,
            code: '00-UT-UPDATE',
            description: 'Unit Test Updated',
            isCheckingType: false,
            isSavingsType: false,
            isCertificateOfDepositType: false,
            isMoneyMarketType: false,
            isIndividualRetirementType: false
        };

        const {status} = await refAccountTypeService.updateRefAccountType(refAccountType);

        expect(status).toBe(200);
    });

test('sends a DELETE request to localhost to delete a refAccountType and checks if status is "204 NO CONTENT"',
    async () => {
        const {status} = await refAccountTypeService.deleteRefAccountType(unitTestRefAccountType.id);

        expect(status).toBe(204);
    });
//endregion