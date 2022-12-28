import sharp from 'sharp';

async function resizer(
    input: string,
    width: number,
    height: number,
    output: string
): Promise<void> {
    try {
        await sharp(input).resize(width, height).toFile(output);
        console.log(`Resized image saved to ${output}`);
    } catch (err) {
        console.error(err);
    }
}

export default resizer;
