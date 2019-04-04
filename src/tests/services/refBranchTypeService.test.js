import refBranchTypeService from '../../services/domain/refBranchTypeService';

//region API ENDPOINT TESTS
let unitTestRefBranchType = null;

test('sends a GET request to localhost to get all refBranchTypes and checks if status is "200 OK"',
    async () => {
        const {status} = await refBranchTypeService.getRefBranchTypes();

        expect(status).toBe(200);
    });

test('sends a GET request to localhost to get a single refBranchType and checks if status is "200 OK"',
    async () => {
        const {status} = await refBranchTypeService.getRefBranchType(1);

        expect(status).toBe(200);
    });

test('sends a POST request to localhost to add a refBranchType and checks if status is "201 CREATED"',
    async () => {
        const refBranchType = {
            code: '00-UNIT-TEST',
            description: 'Unit Test',
            isLargeUrbanType: false,
            isSmallRuralType: false,
            isMediumSuburbanType: false
        };
        const {status} = await refBranchTypeService.addRefBranchType(refBranchType);

        // Arranges unit test refBranchType for next unit tests.
        const {data} = await refBranchTypeService.getRefBranchTypeByCode('00-UNIT-TEST');
        unitTestRefBranchType = {
            id: data.id,
            code: '00-UNIT-TEST',
            description: 'Unit Test',
            isLargeUrbanType: false,
            isSmallRuralType: false,
            isMediumSuburbanType: false
        };

        expect(status).toBe(201);
    });

test('sends a PUT request to localhost to update a refBranchType and checks if status is "200 OK"',
    async () => {
        const refBranchType = {
            id: unitTestRefBranchType.id,
            code: '00-UT-UPDATE',
            description: 'Unit Test Update',
            isLargeUrbanType: false,
            isSmallRuralType: false,
            isMediumSuburbanType: false
        };

        const {status} = await refBranchTypeService.updateRefBranchType(refBranchType);

        expect(status).toBe(200);
    });

test('sends a DELETE request to localhost to delete a refBranchType and checks if status is "204 NO CONTENT"',
    async () => {
        const {status} = await refBranchTypeService.deleteRefBranchType(unitTestRefBranchType.id);

        expect(status).toBe(204);
    });
//endregion