"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var process_1 = __importDefault(require("../utilities/process"));
var routes = express_1.default.Router();
routes.use('/images', function (req, res, next) {
    try {
        var filename = req.query.filename;
        var filename_full = '/' + filename + '.jpg';
        var inputFile = path_1.default.join(__dirname, '..', '..', '/assets', '/full', filename_full);
        var width = parseInt(req.query.width);
        var height = parseInt(req.query.height);
        var filename_thumb = '/' + filename + '_thumb.jpg';
        var outputFile = path_1.default.join(__dirname, '..', '..', '/assets', '/thumb', filename_thumb);
        (0, process_1.default)(inputFile, width, height, outputFile);
        res.sendFile(outputFile, function (err) {
            if (err) {
                next(err);
            }
            else {
                console.log('Sent');
                next();
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
routes.get('/images', function (req, res) {
    console.log('sent');
    res.send();
});
exports.default = routes;
