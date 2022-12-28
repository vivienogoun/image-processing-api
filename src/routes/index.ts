import express from 'express';
import path from 'path';
import resizer from '../utilities/process';
const routes = express.Router();

routes.get('/images', (req, res, next) => {
    try {
        const filename: string = req.query.filename as unknown as string;
        const filename_full: string = '/' + filename + '.jpg';
        const inputFile: string = path.join(
            __dirname,
            '..',
            '..',
            '/assets',
            '/full',
            filename_full
        );
        const width: number = parseInt(req.query.width as unknown as string);
        const height: number = parseInt(req.query.height as unknown as string);
        const filename_thumb: string = '/' + filename + '_thumb.jpg';
        const outputFile: string = path.join(
            __dirname,
            '..',
            '..',
            '/assets',
            '/thumb',
            filename_thumb
        );
        resizer(inputFile, width, height, outputFile);
        next();
    } catch (error) {
        console.log(error);
    }
}, (req, res) => {
        const filename: string = req.query.filename as unknown as string;
        const imagePath: string = filename + '_thumb.jpg';
        res.redirect(`/api/images/${imagePath}`);
});

export default routes;
