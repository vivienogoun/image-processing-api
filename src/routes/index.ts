import express from 'express';   
const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('it is working');
});

export default routes;