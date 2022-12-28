import express from 'express';
import routes from './routes/index';
import path from 'path';

const app = express();
const port = 3000;

app.use(
    '/api/images',
    express.static(path.join(__dirname, '..', 'assets', 'thumb'))
);
app.use('/api', routes);

app.listen(port, () => {
    console.log('server started at http://localhost:' + port);
});

export default app;
