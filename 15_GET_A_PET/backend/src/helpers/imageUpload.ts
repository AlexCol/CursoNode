import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "";

        if (req.baseUrl.includes("users")) {
            folder = "users";
        } else if (req.baseUrl.includes("pets")) {
            folder = "pets";
        }

        cb(null, `public/images/${folder}`);

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

export const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 2000000, //2MB
    },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Invalid file type, only JPG, JPEG and PNG are allowed!'));
        }
        cb(null, true);
    }
});

