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
    output: string
): Promise<void> {
    try {
        await sharp(input)
            .resize(width, height)
            .toFile(output)
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
}

export default { resizer, fileExists };
