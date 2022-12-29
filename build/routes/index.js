"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
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
        var filename_thumb = '/' + filename + '_thumb.jpg';
        var outputFile = path_1.default.join(__dirname, '..', '..', '/assets', '/thumb', filename_thumb);
        try {
            fs_1.default.accessSync(outputFile, fs_1.default.constants.F_OK);
            res.sendFile(outputFile);
        }
        catch (error) {
            try {
                (0, process_1.default)(inputFile, width, height, outputFile);
            }
            catch (error) {
                res.send('Please provide a valid filename');
            }
            res.sendFile(outputFile);
        }
    }
    catch (error) {
        console.log(error);
        res.send('Something goes wrong. Please try again !');
    }
});
exports.default = routes;
