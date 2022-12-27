import express from 'express';

const app = express();
const port = 3000;

app.get('/test', (req, res) => {
    res.send('testing work');
});

app.listen(port, () => {
    console.log('server started at http://localhost:' + port);
});

export default app;
