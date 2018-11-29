const multer = require('multer');
// Multer config
const multerOptions = {
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './uploads/');
        },
        filename: (req, file, callback) => {
            callback(null, new Date().toISOString().replace(/:/g, '-') +'-name-'+ file.originalname);
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 8
    },
    fileFilter: (req, file, callback) => {
        file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ? callback(null, true) : callback(null, false);
    }
};
// Multer upload final config
exports.upload = multer({
    storage: multerOptions.storage,
    limits: multerOptions.limits,
    fileFilter: multerOptions.fileFilter,
});
