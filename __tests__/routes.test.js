const request = require('supertest');
const startServer = require('../src/app.js');

let server = null;

async function postInput(input = `Bob's Burgers`) {
  return await request(server)
    .post('/input')
    .set('Content-Type', 'text/plain')
    .send(input);
}

async function doQuery(key) {
  return await request(server).get(`/query?key=${key}`);
}

function testJsonResponse(res, statusCode = 200) {
  expect(res.statusCode).toBe(statusCode);
  expect(res.type).toEqual('application/json');
}

beforeAll(() => {
  server = startServer(9001);
  console.log = jest.fn();
});

afterAll(() => server.close());

describe('Endpoints', () => {
  test('GET /', async () => {
    const res = await request(server).get('/');
    testJsonResponse(res);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('GET /all', async () => {
    const res = await request(server).get('/all');
    testJsonResponse(res);
    expect(res.body).toEqual({ total: 0 });
  });

  test('POST /input', async () => {
    const res1 = await postInput();
    testJsonResponse(res1);
    expect(res1.body).toEqual({ '0ba0cf6d-ef7b-5047-89a6-e9e42651ad77': 1 });

    const res2 = await request(server).post('/input');
    testJsonResponse(res2, 400);
    expect(res2.body).toEqual({
      status: 'error',
      message: 'The request body MUST be a string',
    });
  });

  test('GET /query', async () => {
    const str = 'bob';
    const resKey = '48181acd-22b3-5dae-bc8a-447868a7df7c';

    const res1 = await doQuery(str);
    expect(res1.statusCode).toBe(200);
    expect(res1.body).toBe(0);

    const res2 = await postInput(str);
    testJsonResponse(res2);
    expect(res2.body).toEqual({ [resKey]: 1 });

    const res3 = await doQuery(str);
    testJsonResponse(res3);
    expect(res3.body).toBe(1);

    const res4 = await postInput(str);
    testJsonResponse(res4);
    expect(res4.body).toEqual({ [resKey]: 2 });

    const res5 = await doQuery(str);
    testJsonResponse(res5);
    expect(res5.body).toBe(2);

    const res6 = await doQuery('');
    testJsonResponse(res6, 400);
    expect(res6.body).toEqual({
      status: 'error',
      message: `Param 'key' must be set to a string value`,
    });
  });

  test('GET /all again', async () => {
    const res = await request(server).get('/all');
    testJsonResponse(res);
    expect(Object.keys(res.body).length).toBe(3);
    expect(res.body.total).toBe(3);
  });
});
