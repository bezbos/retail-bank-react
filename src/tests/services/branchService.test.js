import branchService from '../../services/domain/branchService';

//region API ENDPOINT TESTS
let unitTestBranch = null;

test('sends a GET request to localhost to get a range of branchs and checks if status is "200 OK"',
    async () => {
        const {status} = await branchService.getBranchesRange();

        expect(status).toBe(200);
    });

test('sends a GET request to localhost to get a single branch and checks if status is "200 OK"',
    async () => {
        const {status} = await branchService.getBranch(1);

        expect(status).toBe(200);
    });

test('sends a POST request to localhost to add a branch and checks if status is "201 CREATED"',
    async () => {
        const branch = {
            address: {
                id: 1
            },
            bank: {
                id: 1
            },
            type: {
                id: 1
            },
            details: 'Unit Test'
        };

        const {status} = await branchService.addBranch(branch);

        // Arranges unit test branch for next unit tests.
        const {data} = await branchService.getBranchByDetails('Unit Test');
        unitTestBranch = {id: data.id, details: data.details};

        expect(status).toBe(201);
    });

test('sends a PUT request to localhost to update a branch and checks if status is "200 OK"',
    async () => {
        const branch = {
            id: unitTestBranch.id,
            address: {
                id: 2
            },
            bank: {
                id: 2
            },
            type: {
                id: 2
            },
            details: 'Unit Test Updated'
        };

        const {status} = await branchService.updateBranch(branch);

        expect(status).toBe(200);
    });

test('sends a DELETE request to localhost to delete a branch and checks if status is "204 NO CONTENT"',
    async () => {
        const {status} = await branchService.deleteBranch(unitTestBranch.id);

        expect(status).toBe(204);
    });
//endregion