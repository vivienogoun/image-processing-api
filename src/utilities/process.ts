import sharp from 'sharp';

const resizer = (
    inputFile: string,
    width: number,
    height: number,
    outputFile: string
): boolean => {
    sharp(inputFile).resize(width, height).toFile(outputFile);
    return true;
};

export default resizer;
