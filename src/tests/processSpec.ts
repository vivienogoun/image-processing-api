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
            'fjord-200-200.jpg'
        );
        await functions.resizer(input, width, height, output);

        const metadata = await sharp(output).metadata();
        expect(metadata.width).toEqual(width);
        expect(metadata.height).toEqual(height);
    });
});
