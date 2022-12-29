import express from 'express';
import path from 'path';
import fs from 'fs';
import resizer from '../utilities/process';
const routes = express.Router();

routes.get(
    '/images',
    (req: express.Request, res: express.Response): void | express.Response => {
        try {
            const filename: string = req.query.filename as unknown as string;
            if (!filename) {
                return res.status(400).send({ error: 'Filename is required' });
            }
            const filename_full: string = '/' + filename + '.jpg';
            const inputFile: string = path.join(
                __dirname,
                '..',
                '..',
                '/assets',
                '/full',
                filename_full
            );
            const width: number = parseInt(
                req.query.width as unknown as string
            );
            const height: number = parseInt(
                req.query.height as unknown as string
            );
            if (
                !Number.isInteger(Number(width)) ||
                !Number.isInteger(Number(height)) ||
                Number(width) <= 0 ||
                Number(height) <= 0
            ) {
                return res.status(400).send({
                    error: 'Width and height must be positive integers'
                });
            }
            const filename_thumb: string = '/' + filename + '_thumb.jpg';
            const outputFile: string = path.join(
                __dirname,
                '..',
                '..',
                '/assets',
                '/thumb',
                filename_thumb
            );

            try {
                fs.accessSync(outputFile, fs.constants.F_OK);
                res.sendFile(outputFile);
            } catch (error) {
                try {
                    resizer(inputFile, width, height, outputFile);
                } catch (error) {
                    res.send('Please provide a valid filename');
                }
                res.sendFile(outputFile);
            }
        } catch (error) {
            console.log(error);
            res.send('Something goes wrong. Please try again !');
        }
    }
);

export default routes;
