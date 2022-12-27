import express from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';
import resizer from '../utilities/process';
const routes = express.Router();

routes.get('/images', async (req, res) => {
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
        try {
            await fsPromises.mkdir(
                path.join(__dirname, '..', '..', '/assets', '/thumb')
            );
        } catch (error) {
            console.log(error);
        }
        const outputFile: string = path.join(
            __dirname,
            '..',
            '..',
            '/assets',
            '/thumb',
            filename_thumb
        );
        resizer(inputFile, width, height, outputFile);
        res.sendFile(path.resolve(outputFile));
    } catch (error) {
        console.log(error);
    }
});

export default routes;
