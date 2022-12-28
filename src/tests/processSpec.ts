import resizer from '../utilities/process';
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
        const width: number = 100;
        const height: number = 100;
        const output: string = path.join(
            __dirname,
            '..',
            '..',
            '/assets',
            '/thumb',
            'fjord_thumb.jpg'
        );
        await resizer(input, width, height, output);

        const metadata = await sharp(output).metadata();
        expect(metadata.width).toEqual(width);
        expect(metadata.height).toEqual(height);
    });
});
