const multer = require('multer');

const MIME_TYPE_MAP = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/bmp": "bmp",
    "image/tiff": "tiff",
    "image/svg+xml": "svg",
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/vnd.ms-powerpoint": "ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
    "text/plain": "txt",
    "application/zip": "zip",
    "application/x-rar-compressed": "rar",
    "application/x-tar": "tar",
    "application/x-7z-compressed": "7z",
    "application/x-gzip": "gz",
    "audio/mpeg": "mp3",
    "audio/wav": "wav",
    "audio/ogg": "ogg",
    "video/mp4": "mp4",
    "video/quicktime": "mov",
    "video/x-msvideo": "avi",
    "video/x-ms-wmv": "wmv",
};

const storage = multer.diskStorage({
    destination: function (_, file, cb) {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "uploads");
        // cb(null, 'public/uploads')
    },
    filename: function (_, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const lastDotIndex = file.originalname.lastIndexOf(".");
        const firstPartOfFileName = file.originalname.substring(0, lastDotIndex);
        let fileName = firstPartOfFileName.replace(/[()]/g, "");
        fileName = fileName.replace(/ /g, '-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, fileName + '-' + uniqueSuffix + '.' + ext);
    }
});

module.exports = multer({
    storage: storage
});