"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var process_1 = __importDefault(require("../utilities/process"));
var routes = express_1.default.Router();
routes.get('/images', function (req, res) {
    try {
        var filename = req.query.filename;
        if (!filename) {
            return res.status(400).send({ error: 'Filename is required' });
        }
        var filename_full = '/' + filename + '.jpg';
        var inputFile = path_1.default.join(__dirname, '..', '..', '/assets', '/full', filename_full);
        var width = parseInt(req.query.width);
        var height = parseInt(req.query.height);
        if (!Number.isInteger(Number(width)) ||
            !Number.isInteger(Number(height)) ||
            Number(width) <= 0 ||
            Number(height) <= 0) {
            return res.status(400).send({
                error: 'Width and height must be positive integers'
            });
        }
        /*const filename_thumb: string = '/' + filename + '_thumb.jpg';
        const outputFile: string = path.join(
            __dirname,
            '..',
            '..',
            '/assets',
            '/thumb',
            filename_thumb
        );*/
        var imagesFolder = path_1.default.join(__dirname, '..', '..', '/assets', '/thumb'); // folder for storing cached images
        var imageName = "".concat(filename, "-").concat(width, "-").concat(height, ".jpg"); // name the cached image using the size dimensions
        var imagePath = path_1.default.join(imagesFolder, imageName); //  path to the cached image file
        if (process_1.default.fileExists(imagePath)) {
            // serve the cached image if it exists
            res.sendFile(imagePath);
        }
        else {
            // resize and cache the image if it doesn't exist
            process_1.default.resizer(inputFile, width, height, imagePath);
            // serve the resized image
            res.sendFile(imagePath);
            //res.redirect(req.originalUrl);
            // Reload the page
            res.send("\n                <html>\n                    <head>\n                    <script>\n                        window.location.reload();\n                    </script>\n                    </head>\n                    <body>\n                    Page is reloading...\n                    </body>\n                </html>\n                ");
        }
    }
    catch (error) {
        console.log(error);
        res.send('Something goes wrong. Please try again !');
    }
});
exports.default = routes;
