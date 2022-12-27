import sharp from 'sharp';

const resizer = (
    inputFile: string,
    width: number,
    height: number,
    outputFile: string
): void => {
    sharp(inputFile).resize(width, height).toFile(outputFile);
};

export default resizer;
