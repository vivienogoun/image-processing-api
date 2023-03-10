import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Endpoint Testing', () => {
    it('gets the test endpoint', async () => {
        try {
            const response = await request.get(
                '/api/images?filename=palmtunnel&width=200&height=200'
            );
            expect(response.status).toBe(200);
        } catch (error) {
            console.log(error);
        }
    });
});
