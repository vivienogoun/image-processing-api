import express from 'express';
import path from 'path';
import LRUCache from 'lru-cache';
import resizer from '../utilities/process';
const routes = express.Router();

const cache = new LRUCache({
    max: 100, // Set the maximum number of items in the cache
    ttl: 1000 * 60 * 60 // Set the maximum age of an item in the cache (in milliseconds)
});

routes.get('/images', (req, res) => {
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
        const width: number = parseInt(req.query.width as unknown as string);
        const height: number = parseInt(req.query.height as unknown as string);
        if (
            !Number.isInteger(Number(width)) ||
            !Number.isInteger(Number(height)) ||
            Number(width) <= 0 ||
            Number(height) <= 0
        ) {
            return res
                .status(400)
                .send({ error: 'Width and height must be positive integers' });
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

        // Generate a unique key for the image
        const key = `${filename}-${width}-${height}`;

        // Check if the image is in the cache
        const imageData = cache.get(key);

        if (imageData) {
            // If the image is in the cache, send it in the response
            res.sendFile(outputFile); //, { root: __dirname });
            return;
        }

        resizer(inputFile, width, height, outputFile);
        res.sendFile(outputFile);
    } catch (error) {
        console.log(error);
        res.send('Something goes wrong. Please try again !');
    }
});

export default routes;
