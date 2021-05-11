import { RequestMock, Selector } from 'testcafe';

const headers = {
    'access-control-allow-credentials': 'true',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': '*',
    'access-control-allow-headers': '*',
    'access-control-max-age': '1800'
};

const activitiesMock = RequestMock()
    .onRequestTo({ method: 'GET', url: 'http://localhost:8080/activities', isAjax: true })
    .respond([
        {
            id: 1,
            name: 'first item'
        },
        {
            id: 2,
            name: 'second item'
        }
    ], 200, headers);

const zeroActivitiesMock = RequestMock()
    .onRequestTo({ method: 'GET', url: 'http://localhost:8080/activities' })
    .respond([], 200, headers);

export const deleteMock = RequestMock()
    .onRequestTo({
        url: 'http://localhost:8080/activities/:bulkDelete',
        isAjax: true,
    }).respond(undefined, 200, headers);


fixture`List Activity`
    .page(`http://localhost:3000`);

test.requestHooks(activitiesMock, deleteMock)(
    'should delete activities',
    async (t) => {
        const list = Selector('[data-testid="list"]');
        const deleteBtn = Selector('[data-testid="delete-btn"]');

        await t.expect(list.childElementCount).eql(2);

        await t.removeRequestHooks(activitiesMock);
        await t.addRequestHooks(zeroActivitiesMock);

        await t.click(deleteBtn);

        await t.expect(list.childElementCount).eql(0);
    }
);
