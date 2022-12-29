import sharp from 'sharp';
import fs from 'fs';

function fileExists(filepath: string) {
    try {
        fs.accessSync(filepath, fs.constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
}

async function resizer(
    input: string,
    width: number,
    height: number,
    output: string,
    cachePath: string
): Promise<void> {
    try {
        await sharp(input)
            .resize(width, height)
            .toBuffer()
            .then((data) => {
                // save the resized image to the thumb folder
                fs.writeFileSync(output, data);
                // save the resized image to the cache
                fs.writeFileSync(cachePath, data);
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
}

export default { resizer, fileExists };
