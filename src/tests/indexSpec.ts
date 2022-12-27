import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Endpoint Testing', () => {
    it('gets the test endpoint', async () => {
        const response = await request.get('/test');
        expect(response.status).toBe(200);
    });
});
