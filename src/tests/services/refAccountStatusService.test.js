import refAccountStatusService from '../../services/domain/refAccountStatusService';

//region API ENDPOINT TESTS
let unitTestRefAccountStatus = null;

test('sends a GET request to localhost to get a range of refAccountStatuses and checks if status is "200 OK"',
    async () => {
        const {status} = await refAccountStatusService.getRefAccountStatuses();

        expect(status).toBe(200);
    });

test('sends a GET request to localhost to get a single refAccountStatus and checks if status is "200 OK"',
    async () => {
        const {status} = await refAccountStatusService.getRefAccountStatus(1);

        expect(status).toBe(200);
    });

test('sends a POST request to localhost to add a refAccountStatus and checks if status is "201 CREATED"',
    async () => {
        const refAccountStatus = {
            code: '00-UNIT-TEST',
            description: 'Unit Test',
            isActiveStatus: false,
            isClosedStatus: false
        };
        const {status} = await refAccountStatusService.addRefAccountStatus(refAccountStatus);

        // Arranges unit test refAccountStatus for next unit tests.
        const {data} = await refAccountStatusService.getRefAccountStatusByCode('00-UNIT-TEST');
        unitTestRefAccountStatus = {id: data.id, details: data.details};

        expect(status).toBe(201);
    });

test('sends a PUT request to localhost to update a refAccountStatus and checks if status is "200 OK"',
    async () => {
        const refAccountStatus = {
            id: unitTestRefAccountStatus.id,
            code: '00-UT-UPDATE',
            description: 'Unit Test Updated',
            isActiveStatus: false,
            isClosedStatus: false
        };

        const {status} = await refAccountStatusService.updateRefAccountStatus(refAccountStatus);

        expect(status).toBe(200);
    });

test('sends a DELETE request to localhost to delete a refAccountStatus and checks if status is "204 NO CONTENT"',
    async () => {
        const {status} = await refAccountStatusService.deleteRefAccountStatus(unitTestRefAccountStatus.id);

        expect(status).toBe(204);
    });
//endregion