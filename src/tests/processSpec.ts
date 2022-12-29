import functions from '../utilities/process';
import sharp from 'sharp';
import path from 'path';

describe('Image resizer testing', () => {
    it('should resize the image to the specified width and height', async () => {
        const input: string = path.join(
            __dirname,
            '..',
            '..',
            '/assets',
            '/full',
            'fjord.jpg'
        );
        const width: number = 200;
        const height: number = 200;
        const output: string = path.join(
            __dirname,
            '..',
            '..',
            '/assets',
            '/thumb',
            'fjord_thumb.jpg'
        );
        await functions.resizer(input, width, height, output, path.join(
            __dirname,
            '..',
            '..',
            '/images',
            'fjord-200-200.jpg'
        ));

        const metadata = await sharp(output).metadata();
        expect(metadata.width).toEqual(width);
        expect(metadata.height).toEqual(height);
    });
});
